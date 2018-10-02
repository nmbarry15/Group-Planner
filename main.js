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
        localStorage.setItem("groupName", groupName);
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

// //add firebase data to planner.html
// var gKey = localStorage.getItem("groupKey");
// firebase.database().ref("groups/" + gKey).on("child_added", function (snap) {
//     var sportsArr = [];
//     var outdoorArr = [];
//     var musicArr = [];
//     var popArr = [];
//     console.log(snap.val());

//     snap.forEach(function (child) {
//         if (child.val().category === "sports") {
//             sportsArr.push(child.val());
//         }
//         if (child.val().category === "outdoors") {
//             outdoorArr.push(child.val())
//         }
//         if (child.val().category === "music") {
//             musicArr.push(child.val())
//         }
//         if (child.val().category === "popular") {
//             popArr.push(child.val())
//         }
//     });
//     console.log(sportsArr);
//     console.log(outdoorArr);
//     console.log(musicArr);
//     console.log(popArr)

//     var eventsDiv = $("#event-holder");

//     //add sports events
//     if (!(sportsArr.length == 0)) {
//         var sportsCol = $("<div class='column is-3' id='sports-col'>");
//         var slistHeader = $("<div class='message-header is-info list-header'>").html("<strong> Sports Events </strong>");
//         var sportsList = $("<div class='list-group' id='sportsList'>");


//         for (let i = 0; i < sportsArr.length; i++) {

//             var stime = sportsArr[i].time;
//             var smodifiedTime = moment(stime, "YYYY-MM-DD HH:mm:ss").format("ddd, MMMM Do @ LT");
//             var stitle = sportsArr[i].title;
//             var surl = sportsArr[i].url;
//             var sDescription = sportsArr[i].description;
//             var sportsListItem = $("<div class='list-group-item'>");
//             var sportsBox = $("<div class='box'id='sports-" + i + "' title='" + stitle + "'>");
//             var sportsMedia = $("<article class='media'>");



//             var sposterImg = $("<div class='media-left'>").append($("<i class='fas fa-futbol'></i>"));

//             var sotherInfo = $("<div class='content media-content'>").append(
//                 $("<a href='" + surl + "'target='_blank' rel='noopener noreferrer'>").append("<strong>").text(stitle),
//                 $("<br>"),
//                 $("<small>").text(smodifiedTime),
//                 $("<br>"),
//                 $("<div class='description'>").append($("<small>").html(sDescription))
//             );

//             var sAddBtn = $("<div class='button media-right add-btn is-info is-inverted'  val='sports-" + i + "'>").append($("<i class='far fa-plus-square fa-2x'></i>"));

//             sportsMedia.append(sposterImg, sotherInfo, sAddBtn);
//             sportsBox.append(sportsMedia)

//             sportsListItem.append(sportsBox);
//             sportsList.append(sportsListItem);
//         }
//         sportsCol.append(slistHeader, sportsList)
//         eventsDiv.append(sportsCol);
//         var sList = document.getElementById("sportsList");
//         Sortable.create(sList);
//     }

//     // outdoor events
//     if (!(outdoorArr.length == 0)) {
//         var outdoorCol = $("<div class='column is-3' id='outdoor-col'>");
//         var oListHeader = $("<div class='message-header is-info list-header'>").html("<strong> Outdoor Events </strong>");
//         var outdoorList = $("<div class='list-group' id='outdoorList'>");


//         for (let i = 0; i < outdoorArr.length; i++) {

//             var oTime = outdoorArr[i].time;
//             var oModifiedTime = moment(oTime, "YYYY-MM-DD HH:mm:ss").format("ddd, MMMM Do @ LT");
//             var oTitle = outdoorArr[i].title;
//             var oUrl = outdoorArr[i].url;
//             var oDescription = outdoorArr[i].description;
//             var outdoorListItem = $("<div class='list-group-item'>");
//             var outdoorBox = $("<div class='box' id='outdoor-" + i + "' title='" + oTitle + "'>");
//             var outdoorMedia = $("<article class='media'>");

//             var oPosterImg = $("<div class='media-left'>").append($("<i class='fa fa-tree'></i>"));

//             var oOtherInfo = $("<div class='content media-content'>").append(
//                 $("<a href='" + oUrl + "'target='_blank' rel='noopener noreferrer'>").append("<strong>").text(oTitle),
//                 $("<br>"),
//                 $("<small>").text(oModifiedTime),
//                 $("<br>"),
//                 $("<div class='description'>").append($("<small>").html(oDescription))
//             );

//             var oAddBtn = $("<div class='button media-right add-btn is-info is-inverted'  val='outdoor-" + i + "'>").append($("<i class='far fa-plus-square fa-2x'></i>"));

//             outdoorMedia.append(oPosterImg, oOtherInfo, oAddBtn);
//             outdoorBox.append(outdoorMedia)

//             outdoorListItem.append(outdoorBox);
//             outdoorList.append(outdoorListItem);
//         }
//         outdoorCol.append(oListHeader, outdoorList);
//         eventsDiv.append(outdoorCol);
//         var oList = document.getElementById("outdoorList");
//         Sortable.create(oList);
//     }

//     //add music events
//     if (!(musicArr.length == 0)) {
//         var musicCol = $("<div class='column is-3' id='music-col'>");
//         var mListHeader = $("<div class='message-header is-info list-header'>").html("<strong> Music Events </strong>");
//         var musicList = $("<div class='list-group' id='musicList'>");


//         for (let i = 0; i < musicArr.length; i++) {

//             var mTime = musicArr[i].time;
//             var mModifiedTime = moment(mTime, "YYYY-MM-DD HH:mm:ss").format("ddd, MMMM Do @ LT");
//             var mTitle = musicArr[i].title;
//             var mUrl = musicArr[i].url;
//             var mDescription = musicArr[i].description;
//             var musicListItem = $("<div class='list-group-item'>");
//             var musicBox = $("<div class='box' id='music-" + i + "' title='" + mTitle + "'>");
//             var musicMedia = $("<article class='media'>");


//             var mPosterImg = $("<div class='media-left'>").append($("<i class='fa fa-music'></i>"));

//             var mOtherInfo = $("<div class='content media-content'>").append(
//                 $("<a href='" + mUrl + "'target='_blank' rel='noopener noreferrer'>").append("<strong>").text(mTitle),
//                 $("<br>"),
//                 $("<small>").text(mModifiedTime),
//                 $("<br>"),
//                 $("<div class='description'>").append($("<small>").html(mDescription))
//             );

//             var mAddBtn = $("<div class='button media-right add-btn is-info is-inverted'  val='music-" + i + "'>").append($("<i class='far fa-plus-square fa-2x'></i>"));

//             musicMedia.append(mPosterImg, mOtherInfo, mAddBtn);
//             musicBox.append(musicMedia)

//             musicListItem.append(musicBox);
//             musicList.append(musicListItem);
//         }
//         musicCol.append(mListHeader, musicList);
//         eventsDiv.append(musicCol);
//         var mList = document.getElementById("musicList");
//         Sortable.create(mList);
//     }

//     //add popular events
//     if (!(popArr.length == 0)) {
//         var popCol = $("<div class='column is-3' id='pop-col'>");
//         var pListHeader = $("<div class='message-header is-info list-header'>").html("<strong> Popular Events </strong>");
//         var popList = $("<div class='list-group' id='popList'>");


//         for (let i = 0; i < popArr.length; i++) {

//             var pTime = popArr[i].time;
//             var pModifiedTime = moment(pTime, "YYYY-MM-DD HH:mm:ss").format("ddd, MMMM Do @ LT");
//             var pTitle = popArr[i].title;
//             var pUrl = popArr[i].url;
//             var pDescription = popArr[i].description;
//             var popListItem = $("<div class='list-group-item'>");
//             var popBox = $("<div class='box' id='pop-" + i + "' title='" + pTitle + "'>");
//             var popMedia = $("<article class='media'>");


//             var pPosterImg = $("<div class='media-left'>").append($("<i class='fa fa-users'></i>"));

//             var pOtherInfo = $("<div class='content media-content'>").append(
//                 $("<a href='" + pUrl + "'target='_blank' rel='noopener noreferrer'>").append("<strong>").text(pTitle),
//                 $("<br>"),
//                 $("<small>").text(pModifiedTime),
//                 $("<br>"),
//                 $("<div class='description'>").append($("<small>").html(pDescription))
//             );

//             var pAddBtn = $("<div class='button media-right add-btn is-info is-inverted' val='pop-" + i + "'>").append($("<i class='far fa-plus-square fa-2x'></i>"));

//             popMedia.append(pPosterImg, pOtherInfo, pAddBtn);
//             popBox.append(popMedia)

//             popListItem.append(popBox);
//             popList.append(popListItem);
//         }
//         popCol.append(pListHeader, popList);
//         eventsDiv.append(popCol);
//         var pList = document.getElementById("popList");
//         Sortable.create(pList);
//     }
// });

// //when add-btn clicked
// $(document).ready(function () {
//     $(".add-btn").on("click", function () {
//         console.log("button clicked")
//         console.log(this.val())
//     })
// })

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
