// JavaScript for github-api.html (GitHub git API)

var repoHTML = "<input type='text' name='user' value='...' " +
    "id='user' size='10' />" +
    "<input type='text' name='repo' value='...' " +
    "id='repo' size='10' />" +
    "<button type='button'>Grab repo data</button>" +
    "<div id='repodata'/>";

var github;

function getToken() {
    var token = $("#token").val();
    console.log (token);

    github = new Github({
	token: token,
	auth: "oauth"
    });

    $("#repoform").html(repoHTML)
    $("div#form button").click(getRepo);
};

function getRepo() {
    var user = $("#user").val();
    var reponame = $("#repo").val();
    var repo = github.getRepo(user, reponame); //objeto github //variable local
	console.log(repo);
	console.log("***\n");
    repo.show(showRepo);
};

function showRepo(error, repoJSON) {
    var repodata = $("#repodata");
    if (error) {
	repodata.html("<p>Error code: " + error.error + "</p>");
    } else {
	repodata.html("<p>Repo data:</p>" +
		      "<ul><li>Full name: " + repoJSON.full_name + "</li>" +
		      "<li>Description: " + repoJSON.description + "</li>" +
		      "<li>Created at: " + repoJSON.created_at + "</li>" +
		      "</ul>")
	console.log (repoJSON);
	console.log (repoJSON.full_name, repoJSON.description, repoJSON.created_at);
    }
};

$(document).ready(function() {
    $("div#form button").click(getToken);
    
});
