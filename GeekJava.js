
var hotName = "hottest game";

var xmlhttp = new XMLHttpRequest();
var bggAPIurl = "https://www.boardgamegeek.com/xmlapi2/";   // This is the root url of the API were using, we can append commands to this.
var jsonObj;
var raakaData;
var games;
var hotName;
var games2;

function displayHottest() {

    $("#hottestName").html(hotName);

}

function doOnLoad()
{
 getHotness();

}


function getHotness() {

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