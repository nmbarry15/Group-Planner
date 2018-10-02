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
        var slistHeader = $("<div class='message-header is-info list-header'>").html("<strong> Sports Events </strong>");
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



            var sposterImg = $("<div class='media-left'>").append($("<i class='fas fa-futbol' aria-hidden='true'></i>"));

            var sotherInfo = $("<div class='media-content'>").append("<div class='content'").append($("<p>")).append(
                $("<a href='" + surl + "'target='_blank' rel='noopener noreferrer'>").append("<strong>").text(stitle),
                $("<br>"),
                $("<small>").text(smodifiedTime),
                $("<br>"),
                $("<div class='description'>").append($("<small>").html(sDescription))
            );

            var sAddBtn = $("<div class='media-left'>").append($("<div class='media-right'>").append($("<i class='far fa-plus-square fa-2x'></i>")));

            sportsMedia.append(sposterImg, sotherInfo, sAddBtn);
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
        var oListHeader = $("<div class='message-header is-info list-header'>").html("<strong> Outdoor Events </strong>");
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

            var oPosterImg = $("<div class='media-left'>").append($("<i class='fa fa-tree' aria-hidden='true'></i>"));

            var oOtherInfo = $("<div class='media-content'>").append("<div class='content'").append($("<p>")).append(
                $("<a href='" + oUrl + "'target='_blank' rel='noopener noreferrer'>").append("<strong>").text(oTitle),
                $("<br>"),
                $("<small>").text(oModifiedTime),
                $("<br>"),
                $("<div class='description'>").append($("<small>").html(oDescription))
            );

            var oAddBtn = $("<div class='media-left'>").append($("<div class='media-right'>").append($("<i class='far fa-plus-square fa-2x'></i>")));

            outdoorMedia.append(oPosterImg, oOtherInfo, oAddBtn);
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
        var mListHeader = $("<div class='message-header is-info list-header'>").html("<strong> Music Events </strong>");
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


            var mPosterImg = $("<div class='media-left'>").append($("<i class='fa fa-music'></i>"));

            var mOtherInfo = $("<div class='media-content'>").append("<div class='content'").append($("<p>")).append(
                $("<a href='" + mUrl + "'target='_blank' rel='noopener noreferrer'>").append("<strong>").text(mTitle),
                $("<br>"),
                $("<small>").text(mModifiedTime),
                $("<div class='description'>").append($("<small>").html(mDescription))
            );

            var mAddBtn = $("<div class='media-left'>").append($("<div class='media-right'>").append($("<i class='far fa-plus-square fa-2x'></i>")));

            musicMedia.append(mPosterImg, mOtherInfo, mAddBtn);
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
