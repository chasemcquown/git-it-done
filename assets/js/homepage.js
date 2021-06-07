// reference to form element
var userFormEl = document.querySelector("#user-form");

// reference to input element
var nameInputEl = document.querySelector("#username");

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


// The getUseRepo functions sole purpose is to retrieve the data that we need, in order to obtain a user's GitHub repositories
var getUserRepos = function(user) {
    
    // format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";
  
    // make a request to the url
    fetch(apiUrl).then(function(response) {
      
        response.json().then(function(data) {
        
            console.log(data);
      
        });
    
    });
  
};

userFormEl.addEventListener("submit", formSubmitHandler); 