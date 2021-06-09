// reference to form element
var userFormEl = document.querySelector("#user-form");

// reference to input element
var nameInputEl = document.querySelector("#username");

// reference to repository container
var repoContainerEl = document.querySelector("#repos-container");

// reference to span with id of search-term
var repoSearchTerm = document.querySelector("#repo-search-term");

// create a function to be executed upon a form submission browser event. Pass in event
var formSubmitHandler = function(event) {
    
    // code below will prevent the browser from sending the form's input data to a URL, as we'll handle what happens with the form input data ourselves in JavaScript
    event.preventDefault();

    // get value from the input element and store it into username variable. The .trim(); method will rid the input of any spaces from the entered username. For example " chasemcquown" will become "chasemcquown"
    var username = nameInputEl.value.trim();

    // check that their was a value in the username variable. If a avlue exists for username variable, then pass in the entered username into the getUserRepos function to retrieve enterd user's repos. Then, we use nameInputEl.value = "" to to clear the form after a username has been submitted
    if(username) {
        getUserRepos(username);
        nameInputEl.value = "";
    } else {
        alert("please enter a GitHub username");
    }

    console.log(event);

};


// The getUserRepo functions sole purpose is to retrieve the data that we need, in order to obtain a user's GitHub repositories
var getUserRepos = function(user) {
    
    // format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";
  
    // make a request to the url
    fetch(apiUrl).then(function(response) {

        // check users input for searching a GitHub name. Use the ok property, thats bundled in the response object from fetch, to check if the request was successful. If the staus code is in the 200s, statement will be true and following code will run
        if (response.ok) {
          
            response.json().then(function(data) {
                 
                displayRepos(data, user);
            });
        // if status property is false--in the 400s--then the following alert will run
        } else {
            alert("Error : GitHub user not found");
        }
    
    })
    // use catch() in the case that the request above fails. The catch() method is the fetch API's way of handling network errors
    .catch(function(error) {
        // Notice this `.catch()` getting chained onto the end of the `.then()` method
        alert("Unable to connect to GitHub");
    })
  
};

// create function to display repositories to the webpage. The function will receive the array of repo data as well as the term that was searched for. Both are passed into the function as parameters. 
var displayRepos = function(repos, searchTerm) {

    // check if the user searched for has any repos. If the user searched for doesn't have any repos, then display the following. Once we diplay no repos found, return so that the function stops. 
    if (repos.length === 0) {
        repoContainerEl.textContent = "No repositories found.";
        return;
    };

    console.log(repos);
    console.log(searchTerm);

    // clear old content. repoContainerEl.textContent = ""; will clear the typed input after submit is clicked. repoSearchTerm.textContent = searchTerm will display the name that was searched for. 
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;

    // loop over repos of user that was searched for. Each time repos is looped through, it will execute the code inside for each repo belonging to the user that was searched for
    for(var i = 0; i < repos.length; i++) {

        // format repo name. will display as: username/repo-names
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        // create a container for each repo
        var repoEl = document.createElement("a");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        // this will allow a user to click on a repo to view eahc issue. We appended query parameter (?repo= + repoName) to the end of the href so that upon click, user is taken to single-repohtml page and the page will display issues from whatever user they searched for since we used the repoName variable. 
        repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);

        // create a span element to hold repository name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        // append to the container
        repoEl.appendChild(titleEl);

        // create a status element
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        // check if current repo has issues or not. If it does, then we'll display the number of issues and add a red x icon next to it. If it doesnt, then  blue check mark will be displayed instead
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML = 
            "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square staus-icon icon-success'></i>";
        };

        // append to container
        repoEl.appendChild(statusEl);

        // append container to the dom
        repoContainerEl.appendChild(repoEl); 

    };
};

userFormEl.addEventListener("submit", formSubmitHandler); 

