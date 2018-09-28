//take info from form and make variables on click
$("#submit-btn").on("click", function (event) {
    event.preventDefault();
    var locationz = $("#locationz").val().trim();
    var startDate = $("#start-date").val().trim();
    var endDate = $("#end-date").val().trim();
    
    var dateTime = moment(startDate).format("YYYYMMDD")+"00-"+ moment(endDate).format("YYYYMMDD")+"00"
    console.log(dateTime)
    apiCall(locationz + "&within=25&page_number=1&page_size=6&sort_order=popularity&date=" + dateTime, "event")
});