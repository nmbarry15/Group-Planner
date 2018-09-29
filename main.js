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
    console.log(eventParameters);
  
    locationz= sParameter = encodeURIComponent(locationz.trim()) // changes spaces to %20
    var dateTime = moment(startDate).format("YYYYMMDD")+"00-"+ moment(endDate).format("YYYYMMDD")+"00"
    var holdIt=locationz + "&date=" + dateTime
    apiCall( holdIt, "event")
});

// opening the view plans modal
$("#view-plans-button").on("click", function (event) {
    event.preventDefault();
    $("#view-plans-modal").addClass("is-active")
})

// closing the view plans modal by the cancel button
$("#view-plans-cancel-button").on("click", function (event) {
    event.preventDefault();
    $("#view-plans-modal").removeClass("is-active")
})

// closing the view plans modal by the x
$("#view-plans-x").on("click", function (event) {
    event.preventDefault();
    $("#view-plans-modal").removeClass("is-active")
})

$("#view-plans-button").on("click", function (event) {
    event.preventDefault();
    $("#view-plans-modal").addClass("is-active")
})