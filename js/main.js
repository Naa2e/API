'use strict';


$(document).ready(function() {
var button = $('#zipSubmit');
var userInput = "";

$.get("http://ipinfo.io", function(response) {
    currentTemp(response.postal);
    $('#zip').val(response.postal);
}, "jsonp");

button.click(function(){
    event.preventDefault();
    userInput = $('#zip').val();
    console.log(userInput);
    currentTemp(userInput);
});



    function currentTemp (input) {
        var searchURL = "http://api.wunderground.com/api/33c41345d1292535/conditions/q/" + input + ".json";
        console.log(searchURL);
        $.ajax({
            url : searchURL,
            dataType : "jsonp",
            success : function(data) {
              console.log(data);
              var currentTime = data.current_observation.local_time_rfc822;
              var currentTemp = data.current_observation.temp_f;
              var iconURL = data.current_observation.icon_url;
              changeDisplay(currentTime, input, currentTemp, iconURL);
            }
        });
    }

    function changeDisplay(input1, input2, input3, input4){
        $(".currentTime").text(input1);
        $(".currentZip").text("For zipcode: " + input2);
        $(".currentTemp").text(input3 + " degrees F");
        $(".currentImg").attr("src", input4);
    }
});
