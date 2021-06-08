// get reference to issue container
var issueContainerEl = document.querySelector("#issues-container");

// create function to get repository issues from searched user
var getRepoIssues = function(repo) {

    // create a variable to hold the query
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

    // check the info returned in the response
    fetch(apiUrl).then(function(response) {
        
        // request was successful
        if (response.ok) {
            
            response.json().then(function(data) {
                
                //  call and pass response data to the displayIssues function
                displayIssues(data);
                
                console.log(data);

            });
        // request was unsuccessful    
        } else {

            alert("There was a problem with your request!");

        };
    });

    console.log(repo);
};

// function for displaying the issues to the webpage
var displayIssues = function(issues) {

    // check if there are no existing issues within a repository
    if (issues.length === 0) {
        
        issueContainerEl.textContent = "This repo has no open issues";
        
        return;
    }; 

    issueContainerEl.appendChild(issueEl);

    // loop over the response data and create an <a> element for each issue identified
    for (var i = 0; i< issues.length; i++) {
        
        // create a link element to take users to the issue on GitHub
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        // issue objects have an html_url property that will link to the full issue on GitHub. In other words, the second parameter here is the link for the first parameter which is the href
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");

        // create a span to hold the issue title
        var titleEl = document.createElement("span");
        // make the span display the the issue title that we fetched
        titleEl.textContent = issues[i].title;

        //append to container
        issueEl.appendChild(titleEl);

        // create a type element 
        var typeEl = document.createElement("span");

        // check if issue is an actual issue or a pull request
        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull request)";
        } else {
            typeEl.textContent = "(Issue)";
        };

        // append to container
        issueEl.appendChild(typeEl);



    };

};

getRepoIssues("chasemcquown");