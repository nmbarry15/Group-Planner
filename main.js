//take info from form and make variables on click
var eventParameters
var emails = []
var screenName
var groupName
$("#submit-btn").on("click", function (event) {
    event.preventDefault();
    var locationz = $("#locationz").val().trim();
    var startDate = $("#start-date").val().trim();
    var endDate = $("#end-date").val().trim();

    eventParameters = [];

    if ($("#outdoor-check").prop("checked")) {
        eventParameters.push("outdoors");
    }
    if ($("#sports-check").prop("checked")) {
        eventParameters.push("sports");
    }
    if ($("#music-check").prop("checked")) {
        eventParameters.push("music");
    }
    console.log(eventParameters)
    if ((locationz === "") || (startDate === "") || (endDate === "") || (eventParameters.length === 0)) {
        alert("please fill in all fields and check at least one box.")
    } else {
        initializeGroupKey();

        // opening the send plans modal
        $("#send-plans-modal").addClass("is-active")


        locationz = sParameter = encodeURIComponent(locationz.trim()) // changes spaces to %20
        var dateTime = moment(startDate).format("YYYYMMDD") + "00-" + moment(endDate).format("YYYYMMDD") + "00"
        var holdIt = locationz + "&date=" + dateTime
        apiCall(holdIt, "event")
    }
})

// opening the view plans modal
$("#view-plans-button").on("click", function (event) {
    event.preventDefault();
    $("#view-plans-modal").addClass("is-active")
    if (localStorage.hasOwnProperty('username')) {
        $("#username").val(localStorage.getItem("username"))
    }
    if (localStorage.hasOwnProperty('groupKey')) {
        $("#plan-key").val(localStorage.getItem("groupKey"));
    }
})

// closing the view plans modal by the cancel button
$("#view-plans-cancel-button").on("click", function (event) {
    event.preventDefault();
    $("#view-plans-modal").removeClass("is-active")
})

// closing the view plans modal by the x
$("#view-plans-x").on("click", function (event) {
    $("#view-plans-modal").removeClass("is-active")
})


// closing the send plans modal by the cancel button
$("#send-plans-cancel-button").on("click", function (event) {
    event.preventDefault();
    $("#send-plans-modal").removeClass("is-active")
})

// closing the send plans modal by the x
$("#send-plans-x").on("click", function (event) {
    $("#send-plans-modal").removeClass("is-active")
})

// send plans button storing info and redirecting
$("#send-plans-send-button").on("click", function (event) {
    event.preventDefault();
    screenName = $("#screen-name").val()
    groupName = $("#group-name").val()
    localStorage.setItem("username", screenName);
    for (i = 0; i < 11; i++) {
        var email = $("#email" + i).val().trim()
        if (email !== "") {
            emails.push(email)
            console.log(emails)
        }
    }
    emailSend()
    // store group name locally, in firebase, or both?
    //store event key locally, in firebase, or both?
      window.location = "planner.html"
})

// view plans button storing info and redirecting
$("#view-plans-submit-button").on("click", function (event) {
    event.preventDefault();
    var screenName = $("#username").val()
    localStorage.setItem("username", screenName);
    // store group name locally, in firebase, or both?
    //store event key locally, in firebase, or both?
   // window.location = "planner.html"
})
console.log($("#outdoor-check").hasOwnProperty("checked"))
console.log($("#sports-check").hasOwnProperty("checked"))
console.log($("#music-check").hasOwnProperty("checked"))