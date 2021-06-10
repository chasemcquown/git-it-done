// get reference to span that contains repo name
var repoNameEl = document.querySelector("#repo-name");
// get reference to issue container
var issueContainerEl = document.querySelector("#issues-container");
// get reference to limit-warning container
var limitWarningEl = document.querySelector("#limit-warning");

// get repo name function will 
var getRepoName = function() {

  // check for valid values, in the case that the function couldn's retrieve the corect query parameter. If repoName is valid (or exists), the value will be fed to the fetch call
  if(repoName) {

    // call getRepoIssues function and pass in the info form the repoName variable to fetch related issues form the GitHub api issues endpoint
    getRepoIssues(repoName);

    // to display repository name to the top of the page, do the following...
    repoNameEl.textContent = repoName; 

    // if repoName doesn't exists or is invalid, then do the following 
  } else {

    // redirect user back to the homepage (index.html) if no repo was given
    document.location.replace("./index.html")

  };


  // extract the repo name from the query string using the split method
  var queryString = document.location.search;

  // isolate the needed repoName by splitting query string at = . Now that this has made the info a string, identify the position of the string you want that holds the necessary info
  var repoName = queryString.split("=")[1];


};

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

        // check if api has paginated issues. The following code will return the value of link, if that header exists.
        if (response.headers.get("Link")) {
          displayWarning(repo);
        }
      });
    }
    // request was unsuccessful
    else {
      
      document.location.replace("./index.html")

    }
  });
};


// function for displaying the issues to the webpage
var displayIssues = function(issues) {
  // check if there are no existing issues within a repository
  if (issues.length === 0) {
    issueContainerEl.textContent = "This repo has no open issues!";
    return;
  }

  // loop over the response data and create an <a> element for each issue identified
  for (var i = 0; i < issues.length; i++) {
    // create a link element to take users to the issue on github
    var issueEl = document.createElement("a");
    issueEl.classList = "list-item flex-row justify-space-between align-center";
    issueEl.setAttribute("href", issues[i].html_url);
    issueEl.setAttribute("target", "_blank");
    
    // create span to hold issue title
    var titleEl = document.createElement("span");
    titleEl.textContent = issues[i].title;
    
  
    // append to container
    issueEl.appendChild(titleEl);

    // create a type element
    var typeEl = document.createElement("span");

    // check if issue is an actual issue or a pull request
    if (issues[i].pull_request) {
      
      typeEl.textContent = "(Pull request)";

    }
    else {
      
      // if not successful, do the following (redirect to the hompeage)
      typeEl.textContent = "(Issue)";

    };

    // append to container
    issueEl.appendChild(typeEl);
  
    // append to the dom
    issueContainerEl.appendChild(issueEl);
  }
};

// this functions purpose will be to display a warning if a repo has more than 30 issues
var displayWarning = function(repo) {
  // add text to warning container
  limitWarningEl.textContent = "To see more than 30 issues, visit ";

  // create link element
  var linkEl = document.createElement("a");
  linkEl.textContent = "GitHub.com";
  linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
  linkEl.setAttribute("target", "_blank");

  // append to warning container
  limitWarningEl.appendChild(linkEl);
};

getRepoName();


// IGNORE

// Notes

// Below is an example of using multiple parameters
// https://api.github.com/search/repositories?q=javascript+is:featured&sort=stars
// The +is:featured parameter  tells the API that we only want featured repositories
// To specify where one parameter ends and another begins, use the & symbol

// Structure for the API will look as follows
// q=SEARCH_KEYWORD_1+SEARCH_KEYWORD_N+QUALIFIER_1+QUALIFIER_N
// A real example of this would look like the following code:
// q=javascript+html+css+is:featured
// In this case, the N keyword would be css and the N qualifier would be is:featured, because they are the last of each set of data, respectively.