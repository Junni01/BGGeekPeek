
var hotName = "hottest game";

var xmlhttp = new XMLHttpRequest();
var bggAPIurl = "https://www.boardgamegeek.com/xmlapi2/";   // This is the root url of the API were using, we can append commands to this.
var jsonObj;
var raakaData;
var raakaData2;  // These variables are here for testing purposes, they might as well be contained in their own methods but for some reason I'm unable to check their content in the console if they're not here.
var games;
var hotName;
var games2;
var searchedGame;
var gameID;
var thumbnail;
var choice;

/*
This function was used for testing purposes.

function displayHottest() {

    $("#hottestName").html(hotName);

} */

function doOnLoad() // this is everything that happens once the <body> section has loaded. At the moment that means the hottest game at the moment if fetched from the API
{
 getHotness();

}


function getHotness() {  // This function fetches the number 1. spot on the board game geek hotness chart and displays it's name and thumbnail.

    var url = bggAPIurl + "hot?type=boardgame"; // url is appended with the correct string
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            raakaData = xmlhttp.responseXML;
            games = raakaData.getElementsByTagName("name");
            hotName = games[0].getAttribute("value");
            games2 = raakaData.getElementsByTagName("thumbnail");
            var hotImg = games2[0].getAttribute("value");
            $("#Hottest").html("<p>Hottest game of the moment:</p> </br>" + "<img src=" + hotImg +" id='hottestGameImg'></br>" + hotName);
            $("#Hottest").fadeIn("slow");  // nice jquery effect.
        }


    }

}

function displaySearchedGame() {  // This function captures input from the search box and uses the API to get the Id of the game that was searched.

    searchedGame = document.getElementById("gamesSearchInput").value;
    var url = bggAPIurl + "search?query=" + searchedGame + "&type=boardgame&exact=1";
    xmlhttp.open("GET", url, true);
    xmlhttp.send();


    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            raakaData = xmlhttp.responseXML;
            var results = raakaData.getElementsByTagName("item");
            gameID = results[0].getAttribute("id");

            displayGameData(gameID); // The ID is then passed to the function that displays game stats according to game ID. Nice way to reuse code since the other functions are tied to the same HTML elements.


        }

    }

}

function displayGameData(gameID) {  // this method handles all the inner html stuff. It gets some core information about the game and a link to a picture.

    var url = bggAPIurl + "thing?id=" + gameID + "&stats=1";
    xmlhttp.open("GET", url, true);
    xmlhttp.send();


    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            raakaData = xmlhttp.responseXML;

            var names = raakaData.getElementsByTagName("name");
            var name = names[0].getAttribute("value");
            $("#name").html(name);
            $("#name").fadeIn("slow");
            var years = raakaData.getElementsByTagName("yearpublished");
            var year = years[0].getAttribute("value");
            $("#year").html("Published: " + year);
            $("#year").fadeIn("slow");
            var times = raakaData.getElementsByTagName("playingtime");
            var time = times[0].getAttribute("value");
            $("#playingTime").html("Play time: " + time + " minutes");
            $("#playingTime").fadeIn("slow");
            var averages = raakaData.getElementsByTagName("average");
            var average = parseFloat(averages[0].getAttribute("value")).toFixed(1);

            $("#score").html("Rating: " + average + "/10");
            $("#score").fadeIn("slow");
            var thumbnails = raakaData.getElementsByTagName("image");
            var thumbnail2 = thumbnails[0];
            thumbnail = thumbnail2.childNodes[0].nodeValue;


            $("#pic").html("<img id='pict' src='" + thumbnail + "'>");
            $('#pict').width(500);
            $("#pic").fadeIn("slow");


            //$("#gameSearchData").html("<table> <tr> <td>Name:" + name + " </td><td>Year: " + year + "</td><td>Playing time: " + time + "</td><td>Score: " + average + "</td><td> <img src='" + thumbnail + "'> </td></tr></table>");
            //$("#gameSearchData").fadeIn("slow");
        }

    }


}


/*

The API handles user collection calls poorly so we didn't implement this part.

function displayUserData() {
    var userSearch
    var searchedUser = document.getElementById("userSearchInput").value;
    var url = bggAPIurl + "user?name=" + searchedUser + "&hot=1&top=1&domain=boardgame";
    xmlhttp.open("GET", url, true);
    xmlhttp.send();


    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            raakaData = xmlhttp.responseXML;
            var results = raakaData.getElementsByTagName("item");
            gameID = results[0].getAttribute("id");

            displayGameData(gameID);


        }


    }

}  */

function displayRandomGame() { // Just a bit of fun with the API, the math.random generates a random ID number and calls for the displaygamedata function with it. The database also contains the data for videogame geek so the results may vary.
    var gameID = Math.floor((Math.random() * 233976));
    displayGameData(gameID);

}

function displayTop10() {  // Basic switch case clause for choosing the right id number of the top 10 games, and once again results are passed to displayGameData.
    choice = $('#topdrop').val();
    switch (choice) {

        case "1": gameID = "161936";
        break;

        case "2": gameID = "174430";
            break;
        case "3": gameID = "182028";
            break;
        case "4": gameID = "12333";
            break;
        case "5": gameID = "187645";
            break;
        case "6": gameID = "167791";
            break;
        case "7": gameID = "120677";
            break;
        case "8": gameID = "169786";
            break;
        case "9": gameID = "173346";
            break;
        case "10": gameID = "84876";
            break;

    }

    displayGameData(gameID)
}











