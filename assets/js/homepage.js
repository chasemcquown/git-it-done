
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

getUserRepos("chasemcquown"); 