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
        $("#NO").remove();
        $("#trip-info").prepend('<h1 class="title is-3 has-text-danger" id="NO">Please fill in all fields and check at least one box.</h1>')
        eventParameters = [];
    } else {
        initializeGroupKey();

        // opening the send plans modal
        $("#send-plans-modal").addClass("is-active")


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
var groupName;
$("#send-plans-send-button").on("click", function (event) {
    event.preventDefault();
    if (($("#email0").val().trim() === "") || ($("#group-name").val().trim() === "") || ($("#screen-name").val().trim() === "")) {
        console.log("HAAAAAAAAAAAY")
        $("#no-sir").remove();
        $("#send-plans-modal-body").prepend('<h1 class="title is-3 has-text-danger" id="no-sir">Group name, screen name, and your email are required.</h1>')
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
    }
})

//add firebase data to planner.html
var gKey = localStorage.getItem("groupKey");
firebase.database().ref("groups/" + gKey).on("child_added", function (snap) {
    var sportsArr = [];
    var outdoorArr = [];
    var musicArr = [];
    console.log(snap.val());

    snap.forEach(function (child) {
        if (child.val().category === "sports") {
            sportsArr.push(child.val());
        }
        if (child.val().category === "outdoors") {
            outdoorArr.push(child.val())
        }
        if (child.val().category === "music") {
            musicArr.push(child.val())
        }
    });
    console.log(sportsArr);
    console.log(outdoorArr);
    console.log(musicArr);

    var eventsDiv = $("#event-holder");

    //add sports events
    if (!(sportsArr.length == 0)) {
        var sportsCol = $("<div class='column' id='sports-col'>");
        var slistHeader = $("<div class='message-header is-dark list-header'>").html("<strong> Sports Events </strong>");
        var sportsList = $("<div class='list-group' id='sportsList'>");


        for (let i = 0; i < sportsArr.length; i++) {
            var sportsListItem = $("<div class='list-group-item'>");
            var sportsBox = $("<div class='box'id='sports-" + i + "'>");
            var sportsMedia = $("<article class='media'>");
            var stime = sportsArr[i].time;
            var smodifiedTime = moment(stime, "YYYY-MM-DD HH:mm:ss").format("ddd, MMMM Do @ LT");
            var stitle = sportsArr[i].title;
            var surl = sportsArr[i].url;
            var sDescription = sportsArr[i].description;



            var sposterImg = $("<div class='media-left'>")/*.append(
                $("<figure class='image is-64x64'>")*/.append($("<i class='fa fa-futbol-o' aria-hidden='true'></i>"));

            var sotherInfo = $("<div class='media-content'>").append("<div class='content'").append($("<p>")).append(
                $("<a href='" + surl + "'target='_blank' rel='noopener noreferrer'>").append("<strong>").text(stitle),
                $("<br>"),
                $("<small>").text(smodifiedTime),
                $("<br>"),
                $("<div class='description'>").text(sDescription)
            );

            sportsMedia.append(sposterImg, sotherInfo);
            sportsBox.append(sportsMedia)

            sportsListItem.append(sportsBox);
            sportsList.append(sportsListItem);
        }
        sportsCol.append(slistHeader, sportsList)
        eventsDiv.append(sportsCol);
        var sportsList = document.getElementById("sportsList");
        Sortable.create(sportsList);
    }

    // outdoor events
    if (!(outdoorArr.length == 0)) {
        var outdoorCol = $("<div class='column' id='outdoor-col'>");
        var oListHeader = $("<div class='message-header is-dark list-header'>").html("<strong> Outdoor Events </strong>");
        var outdoorList = $("<div class='list-group' id='outdoorList'>");


        for (let i = 0; i < outdoorArr.length; i++) {
            var outdoorListItem = $("<div class='list-group-item'>");
            var outdoorBox = $("<div class='box' id='outdoor-" + i + "'>");
            var outdoorMedia = $("<article class='media'>");
            var oTime = outdoorArr[i].time;
            var oModifiedTime = moment(oTime, "YYYY-MM-DD HH:mm:ss").format("ddd, MMMM Do @ LT");
            var oTitle = outdoorArr[i].title;
            var oUrl = outdoorArr[i].url;
            var oDescription = outdoorArr[i].description;

            var oPosterImg = $("<div class='media-left'>")/*.append(
                $("<figure class='image is-64x64'>")*/.append($("<i class='fa fa-tree' aria-hidden='true'></i>"));

            var oOtherInfo = $("<div class='media-content'>").append("<div class='content'").append($("<p>")).append(
                $("<a href='" + oUrl + "'target='_blank' rel='noopener noreferrer'>").append("<strong>").text(oTitle),
                $("<br>"),
                $("<small>").text(oModifiedTime),
                $("<br>"),
                $("<div class='description'>").text(oDescription)
            );

            outdoorMedia.append(oPosterImg, oOtherInfo);
            outdoorBox.append(outdoorMedia)

            outdoorListItem.append(outdoorBox);
            outdoorList.append(outdoorListItem);
        }
        outdoorCol.append(oListHeader, outdoorList);
        eventsDiv.append(outdoorCol);
        var outdoorList = document.getElementById("outdoorList");
        Sortable.create(outdoorList);
    }

    //add music events
    if (!(musicArr.length == 0)) {
        var musicCol = $("<div class='column' id='music-col'>");
        var mListHeader = $("<div class='message-header is-dark list-header'>").html("<strong> Music Events </strong>");
        var musicList = $("<div class='list-group' id='musicList'>");


        for (let i = 0; i < musicArr.length; i++) {
            var musicListItem = $("<div class='list-group-item'>");
            var musicBox = $("<div class='box' id='music-" + i + "'>");
            var musicMedia = $("<article class='media'>");
            var mTime = musicArr[i].time;
            var mModifiedTime = moment(mTime, "YYYY-MM-DD HH:mm:ss").format("ddd, MMMM Do @ LT");
            var mTitle = musicArr[i].title;
            var mUrl = musicArr[i].url;
            var mDescription = musicArr[i].description;
            // console.log(mDescription.length)
            // if(mDescription.length > 30){
            //     mDescription = mDescription.substring(0,30);
            // }

            var mPosterImg = $("<div class='media-left'>")/*.append(
                $("<figure class='image is-64x64'>")*/.append($("<i class='fa fa-music' aria-hidden='true'></i>"));

            var mOtherInfo = $("<div class='media-content'>").append("<div class='content'").append($("<p>")).append(
                $("<a href='" + mUrl + "'target='_blank' rel='noopener noreferrer'>").append("<strong>").text(mTitle),
                $("<br>"),
                $("<small>").text(mModifiedTime),
                $("<br>"),
                $("<div class='description'>").text(mDescription)
            );

            musicMedia.append(mPosterImg, mOtherInfo);
            musicBox.append(musicMedia)

            musicListItem.append(musicBox);
            musicList.append(musicListItem);
        }
        musicCol.append(mListHeader, musicList);
        eventsDiv.append(musicCol);
        var musicList = document.getElementById("musicList");
        Sortable.create(musicList);
    }




});

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
        timeDisplay: moment().format("HH:mm:ss"),
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
        var messageConstructed = $("<p>").text(snap.val().user + ":\xa0\xa0" + snap.val().message);
        $("#chat-box").append(messageConstructed);

    } else if (snap.val().type === "notification") {
        var notificationConstructed = $("<p class='bg-info'>").text(snap.val().timeDisplay + ":\xa0\xa0" + snap.val().user + " liked event, " + snap.val().event + "!")
        $("#chat-box").append(notificationConstructed);
    }
})
