
var hotName = "hottest game";

var xmlhttp = new XMLHttpRequest();
var bggAPIurl = "https://www.boardgamegeek.com/xmlapi2/";   // This is the root url of the API were using, we can append commands to this.
var jsonObj;
var raakaData;
var raakaData2;
var games;
var hotName;
var games2;
var searchedGame;

function displayHottest() {

    $("#hottestName").html(hotName);

}

function doOnLoad() // this is everything that happens once the <body> section has loaded.
{
 getHotness();

}


function getHotness() {  // This function fetches the number 1. spot on the board game geek hotness chart and displays it's name and thumbnail.

    var url = bggAPIurl + "hot?type=boardgame";
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            raakaData = xmlhttp.responseXML;
            games = raakaData.getElementsByTagName("name");
            hotName = games[0].getAttribute("value");
            games2 = raakaData.getElementsByTagName("thumbnail");
            var hotImg = games2[0].getAttribute("value");


            $("#hottestName").html(hotName);
            $("#hottestImg").html("<img src=" + hotImg +">");

        }


    }

}

function displaySearchedGame() {
    var gameID
    searchedGame = document.getElementById("gamesSearchInput").value;
    var url = bggAPIurl + "search?query=" + searchedGame + "&type=boardgame&exact=1";
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

}

function displayGameData(gameID) {

    var url = bggAPIurl + "thing?id=" + gameID + "&stats=1";
    xmlhttp.open("GET", url, true);
    xmlhttp.send();


    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            raakaData = xmlhttp.responseXML;

            var names = raakaData.getElementsByTagName("name");
            var name = names[0].getAttribute("value");

            var years = raakaData.getElementsByTagName("yearpublished");
            var year = years[0].getAttribute("value");

            var times = raakaData.getElementsByTagName("playingtime");
            var time = times[0].getAttribute("value");

            var averages = raakaData.getElementsByTagName("average");
            var average = averages[0].getAttribute("value");

            var thumbnails = raakaData.getElementsByTagName("thumbnail");
            var thumbnail2 = thumbnails[0];
            var thumbnail = thumbnail2.childNodes[0].nodeValue;

            $("#gameSearchData").html("<table> <tr> <td>Name:" + name + " </td><td>Year: " + year + "</td><td>Playing time: " + time + "</td><td>Score: " + average + "</td><td> <img src='" + thumbnail + "'> </td></tr></table>");

        }

    }


}


function displayUserData() {




}












