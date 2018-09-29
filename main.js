//take info from form and make variables on click
var eventParameters
$("#submit-btn").on("click", function (event) {
    event.preventDefault();
    var locationz = $("#locationz").val().trim();
    var startDate = $("#start-date").val().trim();
    var endDate = $("#end-date").val().trim();
  
     eventParameters = [];

    if ($("#outdoor-check").prop( "checked" )){
        eventParameters.push("outdoors");
    }
    if ($("#sports-check").prop( "checked" )){
        eventParameters.push("sports");
    }
    if ($("#music-check").prop( "checked" )){
        eventParameters.push("music");
    }
    if ($("#nightlife-check").prop( "checked" )){
        eventParameters.push("nightlife");
    }
    console.log(eventParameters);
  
    locationz= sParameter = encodeURIComponent(locationz.trim()) // changes spaces to %20
    var dateTime = moment(startDate).format("YYYYMMDD")+"00-"+ moment(endDate).format("YYYYMMDD")+"00"
    var holdIt=locationz + "&date=" + dateTime
    apiCall( holdIt, "event")
});




