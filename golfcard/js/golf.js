var numPlayers = 4;
var numHoles = 18;
var httpRequest = new XMLHttpRequest();
var coursesNearMe;
var teeInfo;
var local_obj = {latitude: 40.3678960,longitude: -111.8538250,radius: 100};
var playerName;

function loadMe() {
    $.post("https://golf-courses-api.herokuapp.com/courses/",local_obj,function(data,status) {
        coursesNearMe = JSON.parse(data);
        for (var p in coursesNearMe.courses){
            var selectdisplay = "<option value='"+ coursesNearMe.courses[p].id +"'>" + coursesNearMe.courses[p].name +"</option>";
            $("#selectCourse").append(selectdisplay);
        }
    });
}

function getCourseInfo(id) {
    $("#selectTeeBox").html('');
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {
            teeInfo = JSON.parse(httpRequest.responseText);
            for(var t = 0; t < (teeInfo.course.holes[0].tee_boxes.length - 1); t++){
                var teeBox = "<option value='" + t + "'>"+ teeInfo.course.holes[0].tee_boxes[t].tee_type +"</option>";
                $("#selectTeeBox").append(teeBox);
            }

        }
    };
    httpRequest.open("GET","https://golf-courses-api.herokuapp.com/courses/" + id,true);
    httpRequest.send();

}

function setCourseInfo(teeboxid) {
    buildScoreCard(teeboxid);
}

function buildScoreCard (){
    for(var c =1; c<= numHoles; c++){
        $(".rightbox").append("<div class='col" + c + "'><div class='colheader'>Hole " + c +" </div></div>");
    }
};

function addPlayer(){
    for(var p = 1; p <= numPlayers; p++){
        $(".leftbox").append("<div class ='playername'>Player " + p + "</div>");
        for(var h = 1; h <= numHoles; h++){
            $(".col" + h).append("<input class='scorebox' type='text' id='player"+ p+"hole" + h+"'/>");
        }
    }
};