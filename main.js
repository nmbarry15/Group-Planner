//take info from form and make variables on click
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
    var startDate = $("#start-date").val().trim();
    var endDate = $("#end-date").val().trim();
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
        groupName = $("#group-name").val()
        localStorage.setItem("username", screenName);
        localStorage.setItem("groupName", groupName);
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

// $("#group-plans").text(firebase.database().)

// chat
function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}
