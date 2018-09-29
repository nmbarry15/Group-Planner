//take info from form and make variables on click
$("#submit-btn").on("click", function (event) {
    event.preventDefault();
    var locationz = $("#locationz").val().trim();
    var startDate = $("#start-date").val().trim();
    var endDate = $("#end-date").val().trim();
    locationz= sParameter = encodeURIComponent(locationz.trim()) // changes spaces to %20
    var dateTime = moment(startDate).format("YYYYMMDD")+"00-"+ moment(endDate).format("YYYYMMDD")+"00"
    console.log(locationz)
    apiCall(dateTime,locationzs)
});