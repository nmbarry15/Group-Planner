//take info from form and make variables on click
var startDate
var endDate
var eventParameters
var emails = []
var screenName
var groupName
function reset(box) {
    box.removeClass("is-info")
    box.removeClass("is-danger")
    box.addClass("is-info")
}
function makeRed(box) {
    box.removeClass("is-info")
    box.addClass("is-danger")
}

$("#submit-btn").on("click", function (event) {
    event.preventDefault();
    var locationz = $("#locationz").val().trim();
    startDate = $("#start-date").val().trim();
    endDate = $("#end-date").val().trim();
    reset($("#email0"))
    reset($("#group-name"))
    reset($("#screen-name"))
    reset($("#locationz"))
    reset($("#start-date"))
    reset($("#end-date"))
    $("#NO").remove();
    $("#no-sir").remove();
    eventParameters = ["popular"];

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
    if ((locationz === "") || (startDate === "") || (endDate === "")) {
        $("#NO").remove();
        $("#trip-info").prepend('<h1 class="title is-3 has-text-danger" id="NO">Please fill in all fields.</h1>')
        eventParameters = ["popular"];
        reset($("#locationz"))
        reset($("#start-date"))
        reset($("#end-date"))
        console.log(endDate)
        if (locationz === "") {
            makeRed($("#locationz"))
        }
        if (startDate === "") {
            makeRed($("#start-date"))
        }
        if (endDate === "") {
            makeRed($("#end-date"))
        }
    } else {
        initializeGroupKey();

        // opening the send plans modal
        $("#send-plans-modal").addClass("is-active")


        locationz = sParameter = encodeURIComponent(locationz.trim()) // changes spaces to %20
        latlocation = locationz
        var dateTime = moment(startDate).format("YYYYMMDD") + "00-" + moment(endDate).format("YYYYMMDD") + "00"
        var holdIt = locationz + "&date=" + dateTime
        apiCall(holdIt, "event")
    }
})

// opening the view plans modal
$("#view-plans-button").on("click", function (event) {
    event.preventDefault();
    reset($("#username"))
    reset($("#plan-key"))
    $("#nope").remove();
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
    if (($("#email0").val().trim() === "") || ($("#group-name").val().trim() === "") || ($("#screen-name").val().trim() === "") || $("#email0").val().indexOf("@") === -1 || $("#email0").val().indexOf(".") === -1) {
        $("#no-sir").remove();
        $("#send-plans-modal-body").prepend('<h1 class="title is-3 has-text-danger" id="no-sir">Group name, screen name, and your valid email are required.</h1>')
        reset($("#email0"))
        reset($("#group-name"))
        reset($("#screen-name"))
        if ($("#email0").val().trim() === "") {
            makeRed($("#email0"))
        }
        if ($("#group-name").val().trim() === "") {
            makeRed($("#group-name"))
        }
        if ($("#screen-name").val().trim() === "") {
            makeRed($("#screen-name"))
        }
    } else {
         screenName = $("#screen-name").val()
        groupName = $("#group-name").val()

        localStorage.setItem("username", screenName);
        localStorage.setItem("groupName", groupName)
        for (i = 0; i < 11; i++) {
            var email = $("#email" + i).val().trim()
            if (email !== "") {
                emails.push(email)
                console.log(emails)
            }
        }
        var gKey = localStorage.getItem("groupKey");
        firebase.database().ref("groups/" + gKey + "/groupName").set(groupName);
        emailSend()
        // store group name locally, in firebase, or both?
        //store event key locally, in firebase, or both?
        window.location = "planner.html"
        $("#group-plans").text(groupName + " Plans");
    }
});

// view plans button storing info and redirecting
$("#view-plans-submit-button").on("click", function (event) {
    event.preventDefault();
    if (($("#username").val().trim() !== "") && ($("#plan-key").val().trim() !== "")) {
        var screenName = $("#username").val().trim()
        var gKey = $("#plan-key").val().trim();
        console.log("groupKey: " + gKey)
        localStorage.setItem("groupKey", gKey)
        localStorage.setItem("username", screenName);
        // store group name locally, in firebase, or both?
        //store event key locally, in firebase, or both?
        window.location = "planner.html"
    } else {
        $("#nope").remove();
        $("#view-plans-modal-body").prepend('<h1 class="title is-3 has-text-danger" id="nope">Plan key and screen name required.</h1>')
        reset($("#username"))
        reset($("#plan-key"))
        if ($("#username").val().trim() === "") {
            makeRed($("#username"))
        }
        if ($("#plan-key").val().trim() === "") {
            makeRed($("#plan-key"))
        }
    }
})

// chat
function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

// CHAT CODE HERE

// =======================  Send Message On Click  ========================

$("#chat-send-button").on("click", function (event) {
    event.preventDefault();
    if ($("#message-input").val().trim() !== "") {
        var msgData = {
            message: $("#message-input").val().trim(),
            user: localStorage.getItem("username"),
            timeDisplay: moment().format("HH:mm:ss"),
            type: "message",
            timestamp: moment().unix()
        };
        database.ref("groups/" + localStorage.getItem("groupKey") + "/chat").push(msgData);
        $("#message-input").val("");
    }
});

// =======================  Like Button or Notification On Click  ========================

// $("#like-btn").on("click", function(event) {
//     event.preventDefault();

//     var notifyData = {
//         user: localStorage.getItem("username"),
//         event: $(".like-btn").attr("title"),
//         timeDisplay: moment().format("HH:mm"),
//         type: "notification",
//         timestamp: moment().unix()
//     }

//     database.ref("groups/" + localStorage.getItem("groupKey") + "/chat").push(notifyData);
// })

// =======================  Listener for any Chat Log Updates  ========================
database.ref("groups/" + localStorage.getItem("groupKey") + "/chat").orderByChild("timestamp").on("child_added", function (snap) {
    console.log("This is is the key being used to pull chat data:" + localStorage.getItem("groupKey"));
    if (snap.val().type === "message") {
        var constructedMessage = $('<div class ="parent">');
        var userStuff
        var displayTime = $("<div class = 'child has-background-dark'>").html("<p class = 'has-text-white'> Sent at: " + snap.val().timeDisplay + "<p>")
        if (snap.val().user === localStorage.getItem("username")) {
            userStuff = '<font color="red">' + snap.val().user + '</font>'
        }
        else {
            userStuff = '<font color="blue">' + snap.val().user + '</font>'
        }
        var messageContent = $("<span>").html(userStuff + ":\xa0\xa0" + snap.val().message);

        constructedMessage.append(messageContent, displayTime);
        $("#chat-box").append(constructedMessage);

    } else if (snap.val().type === "notification") {
        var constructedNotification = $('<div class="has-backgorund-liked" data-time-display=' + snap.val().timeDisplay + '>');
        var notificationContent = $("<span>").html('<font color="green">' + snap.val().user + "</font> liked the event:\xa0" + snap.val().event);

        constructedNotification.append(notificationContent);
        $("#chat-box").append(constructedNotification);
    }
})
// =======================  Listener for Weather  ========================
var icon
var forecast
var forecastStartDate
if ($("#checkIt").attr("value") === "true") {
    database.ref("groups/" + localStorage.getItem("groupKey") + "/weather").once("value", function (snap) {
        icon = snap.val().icon;
        forecast = snap.val().forecast;
        forecastStartDate = snap.val().forecastStartDate;
        console.log(forecast, forecastStartDate, icon)
        console.log(icon[0])
        for (x = 0; x < forecast.length; x++) {
            console.log("I be in it")
            var y = x + 1
            $("#weather-holder").append("<div class='column'>Day " + y + " <br>" + icon[x] + " </div>")
        }

    })
    database.ref("groups/" + localStorage.getItem("groupKey")).once("value", function(snap) {  
        groupNam=snap.val().groupName
        console.log(groupNam)}
    )
}

$(".title").on("click", function(){
    window.location = "index.html"
})


