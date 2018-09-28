//take info from form and make variables on click
$("#submit-btn").on("click", function (event) {
    event.preventDefault();
    var locationz = $("#locationz").val().trim();
    var startDate = $("#start-date").val().trim();
    var endDate = $("#end-date").val().trim();
    var eventParameters = [];

    if ($("#outdoor-check").prop( "checked" )){
        eventParameters.push("outdoor");
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
    
    var dateTime = moment(startDate).format("YYYYMMDD")+"00-"+ moment(endDate).format("YYYYMMDD")+"00"
    // console.log(dateTime)
    apiCall(locationz + "&within=25&page_number=1&page_size=6&sort_order=popularity&date=" + dateTime, "event")
});
