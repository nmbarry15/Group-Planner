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
var groupName;
$("#send-plans-send-button").on("click", function (event) {
    event.preventDefault();
    if (($("#email0").val().trim() === "") || ($("#group-name").val().trim() === "") || ($("#screen-name").val().trim() === "")) {
        $("#no-sir").remove();
        $("#send-plans-modal-body").prepend('<h1 class="title is-3 has-text-danger" id="no-sir">Group name, screen name, and your email are required.</h1>')
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
        var screenName = $("#screen-name").val()
        var groupName = $("#group-name").val()
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
        $("#group-plans").text(groupName + " Plans");
    }
});

// view plans button storing info and redirecting
$("#view-plans-submit-button").on("click", function (event) {
    event.preventDefault();
    if (($("#username").val().trim() !== "") && ($("#plan-key").val().trim() !== "")) {
        var screenName = $("#username").val().trim()
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

$("#chat-send-button").on("click", function(event) {
    event.preventDefault();
    
    var msgData = {
        message: $("#message-input").val(),
        user: localStorage.getItem("username"),
        timeDisplay: moment().format("HH:mm:ss"),
        type: "message",
        timestamp: moment().unix()
    };
    database.ref("groups/chat").push(msgData);
    // REAL DB CALL -- database.ref("groups/" + localStorage.getItem("groupKey") + "/chat").push(msgData);
    $("#message-input").val("");
});

// =======================  Like Button or Notification On Click  ========================

$("#like-button").on("click", function(event) {
    event.preventDefault();

    var notifyData = {
        user: localStorage.getItem("username"),
        event: "Event Name",
        timeDisplay: moment().format("HH:mm"),
        type: "notification",
        timestamp: moment().unix()
    }

    database.ref("groups/" + localStorage.getItem("groupKey") + "/chat").push(notifyData);
})

// =======================  Listener for any Chat Log Updates  ========================
// REAL DB REFERENCE database.ref("groups/" + localStorage.getItem("groupKey") + "/chat").orderByChild("timestamp").on("child_added", function(snap) {

database.ref("groups/chat").orderByChild("timestamp").on("child_added", function(snap) {
    console.log("This is is the key being used to pull chat data:" + localStorage.getItem("groupKey"));
    if (snap.val().type === "message") {
        var constructedTableRow = $('<tr data-time-display='+ snap.val().timeDisplay + '>');
        var username = $("<td class='usernametd'>").text(snap.val().user);
        var messageContent = $("<td class='msgtd'>").text(snap.val().message);

        constructedTableRow.append(username, messageContent);
        $("#chat-box").append(constructedTableRow);
        
    } else if (snap.val().type === "notification") {
        var notificationConstructed = $("<p class='bg-info'>").text(snap.val().timeDisplay + ":\xa0\xa0" + snap.val().user + " liked event, " + snap.val().event + "!")
        $("#chat-box").append(notificationConstructed);
    }
})