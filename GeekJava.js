
var hotName = "hottest game";

var xmlhttp = new XMLHttpRequest();
var bggAPIurl = "https://www.boardgamegeek.com/xmlapi2/";   // This is the root url of the API were using, we can append commands to this.
var jsonObj



function displayHottest() {

    $("#hottestName").html(hotName);

}

function doOnLoad()
{
 getHotness();

}


function getHotness() {

    var url = "https://bgg-json.azurewebsites.net/hot";
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            raakaData = xmlhttp.responseText;
            jsonObj = JSON.parse(xmlhttp.responseText);
        }


    }
}