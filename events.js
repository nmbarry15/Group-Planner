//add firebase data to planner.html
var gKey = localStorage.getItem("groupKey");
firebase.database().ref("groups/" + gKey).on("child_added", function (snap) {
    var sportsArr = [];
    var outdoorArr = [];
    var musicArr = [];
    var popArr = [];
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
        if (child.val().category === "popular") {
            popArr.push(child.val())
        }
    });
    console.log(sportsArr);
    console.log(outdoorArr);
    console.log(musicArr);
    console.log(popArr)

    var eventsDiv = $("#event-holder");

    //add sports events
    if (!(sportsArr.length == 0)) {
        var sportsCol = $("<div class='column is-3' id='sports-col'>");
        var slistHeader = $("<div class='message-header is-info list-header'>").html("<strong> Sports Events </strong>");
        var sportsList = $("<div class='list-group' id='sportsList'>");


        for (let i = 0; i < sportsArr.length; i++) {

            var stime = sportsArr[i].time;
            var smodifiedTime = moment(stime, "YYYY-MM-DD HH:mm:ss").format("ddd, MMMM Do @ LT");
            var stitle = sportsArr[i].title;
            var surl = sportsArr[i].url;
            var sDescription = sportsArr[i].description;
            //var sportsListItem = $("<div class=''>");
            var sportsBox = $("<div class='list-group-item box is-marginless'id='sports-" + i + "' title='" + stitle + "'>");
            var sportsMedia = $("<article class='media'>");



            var sposterImg = $("<div class='media-left'>").append($("<i class='fas fa-futbol'></i>"));

            var sotherInfo = $("<div class='content media-content'>").append(
                $("<a href='" + surl + "'target='_blank' rel='noopener noreferrer'>").append("<strong>").text(stitle),
                $("<br>"),
                $("<small>").text(smodifiedTime),
                $("<br>"),
                $("<div class='description'>").append($("<small>").html(sDescription))
            );

            var sAddBtn = $("<div class='button media-right add-btn is-info is-inverted'  val='sports-" + i + "' cat='sports' finalPlan='false'>").append($("<i class='far fa-plus-square fa-2x toggle' plus='true'></i>"));

            sportsMedia.append(sposterImg, sotherInfo, sAddBtn);
            sportsBox.append(sportsMedia)

            //sportsListItem.append(sportsBox);
            sportsList.append(sportsBox);
        }
        sportsCol.append(slistHeader, sportsList)
        eventsDiv.append(sportsCol);
        Sortable.create(document.getElementById("sportsList"));
    }

    // outdoor events
    if (!(outdoorArr.length == 0)) {
        var outdoorCol = $("<div class='column is-3' id='outdoor-col'>");
        var oListHeader = $("<div class='message-header is-info list-header'>").html("<strong> Outdoor Events </strong>");
        var outdoorList = $("<div class='list-group' id='outdoorList'>");


        for (let i = 0; i < outdoorArr.length; i++) {

            var oTime = outdoorArr[i].time;
            var oModifiedTime = moment(oTime, "YYYY-MM-DD HH:mm:ss").format("ddd, MMMM Do @ LT");
            var oTitle = outdoorArr[i].title;
            var oUrl = outdoorArr[i].url;
            var oDescription = outdoorArr[i].description;
            //var outdoorListItem = $("<div class=''>");
            var outdoorBox = $("<div class='list-group-item box is-marginless' id='outdoor-" + i + "' title='" + oTitle + "'>");
            var outdoorMedia = $("<article class='media'>");

            var oPosterImg = $("<div class='media-left'>").append($("<i class='fa fa-tree'></i>"));

            var oOtherInfo = $("<div class='content media-content'>").append(
                $("<a href='" + oUrl + "'target='_blank' rel='noopener noreferrer'>").append("<strong>").text(oTitle),
                $("<br>"),
                $("<small>").text(oModifiedTime),
                $("<br>"),
                $("<div class='description'>").append($("<small>").html(oDescription))
            );

            var oAddBtn = $("<div class='button media-right add-btn is-info is-inverted'  val='outdoor-" + i + "' cat='outdoor' finalPlan='false'>").append($("<i class='far fa-plus-square fa-2x toggle' plus='true'></i>"));

            outdoorMedia.append(oPosterImg, oOtherInfo, oAddBtn);
            outdoorBox.append(outdoorMedia)

            //outdoorListItem.append(outdoorBox);
            outdoorList.append(outdoorBox);
        }
        outdoorCol.append(oListHeader, outdoorList);
        eventsDiv.append(outdoorCol);
        Sortable.create(document.getElementById("outdoorList"));
    }

    //add music events
    if (!(musicArr.length == 0)) {
        var musicCol = $("<div class='column is-3' id='music-col'>");
        var mListHeader = $("<div class='message-header is-info list-header'>").html("<strong> Music Events </strong>");
        var musicList = $("<div class='list-group' id='musicList'>");


        for (let i = 0; i < musicArr.length; i++) {

            var mTime = musicArr[i].time;
            var mModifiedTime = moment(mTime, "YYYY-MM-DD HH:mm:ss").format("ddd, MMMM Do @ LT");
            var mTitle = musicArr[i].title;
            var mUrl = musicArr[i].url;
            var mDescription = musicArr[i].description;
            //var musicListItem = $("<div class=''>");
            var musicBox = $("<div class='list-group-item box is-marginless' id='music-" + i + "' title='" + mTitle + "'>");
            var musicMedia = $("<article class='media'>");


            var mPosterImg = $("<div class='media-left'>").append($("<i class='fa fa-music'></i>"));

            var mOtherInfo = $("<div class='content media-content'>").append(
                $("<a href='" + mUrl + "'target='_blank' rel='noopener noreferrer'>").append("<strong>").text(mTitle),
                $("<br>"),
                $("<small>").text(mModifiedTime),
                $("<br>"),
                $("<div class='description'>").append($("<small>").html(mDescription))
            );

            var mAddBtn = $("<div class='button media-right add-btn is-info is-inverted'  val='music-" + i + "' cat='music' finalPlan='false'>").append($("<i class='far fa-plus-square fa-2x toggle' plus='true'></i>"));

            musicMedia.append(mPosterImg, mOtherInfo, mAddBtn);
            musicBox.append(musicMedia)

            //musicListItem.append(musicBox);
            musicList.append(musicBox);
        }
        musicCol.append(mListHeader, musicList);
        eventsDiv.append(musicCol);
        Sortable.create(document.getElementById("musicList"));
    }

    //add popular events
    if (!(popArr.length == 0)) {
        var popCol = $("<div class='column is-3' id='pop-col'>");
        var pListHeader = $("<div class='message-header is-info list-header'>").html("<strong> Popular Events </strong>");
        var popList = $("<div class='list-group' id='popList'>");


        for (let i = 0; i < popArr.length; i++) {

            var pTime = popArr[i].time;
            var pModifiedTime = moment(pTime, "YYYY-MM-DD HH:mm:ss").format("ddd, MMMM Do @ LT");
            var pTitle = popArr[i].title;
            var pUrl = popArr[i].url;
            var pDescription = popArr[i].description;
            // var popListItem = $("<div class='>");
            var popBox = $("<div class='list-group-item box is-marginless' id='pop-" + i + "' title='" + pTitle + "'>");
            var popMedia = $("<article class='media'>");


            var pPosterImg = $("<div class='media-left'>").append($("<i class='fa fa-users'></i>"));

            var pOtherInfo = $("<div class='content media-content'>").append(
                $("<a href='" + pUrl + "'target='_blank' rel='noopener noreferrer'>").append("<strong>").text(pTitle),
                $("<br>"),
                $("<small>").text(pModifiedTime),
                $("<br>"),
                $("<div class='description'>").append($("<small>").html(pDescription))
            );

            var pMediaRight = $("<div class = 'media-right'>")
            var pAddBtn = $("<div class='button add-btn is-info is-inverted' val='pop-" + i + "'  cat='pop' finalPlan='false'>").append($("<i class='far fa-plus-square fa-2x toggle' plus='true'></i>")).append("<br>");
            var pLikeBtn =  $("<div class='button like-btn is-info is-inverted is-invisible' val='pop-" + i + "' liked='false'>").append($("<i class='far fa-thumbs-up fa-2x'></i>"));

            pMediaRight.append(pAddBtn, pLikeBtn)

            popMedia.append(pPosterImg, pOtherInfo, pMediaRight);
            popBox.append(popMedia)

            //popListItem.append(popBox);
            popList.append(popBox);
        }
        popCol.append(pListHeader, popList);
        eventsDiv.append(popCol);
        Sortable.create(document.getElementById("popList"));
    }
});

var plansHolder = $("#plans-holder");

$("body").on("click", ".add-btn", function () {
    console.log("button clicked");
    var divId = $(this).attr("val");
    var divCat = $(this).attr("cat");
    var finalPlan = $(this).attr("finalPlan")
    console.log($(this).attr("cat"))
    console.log("Initial finalPlan: " + finalPlan)

    if (finalPlan == "false") {
        plansHolder.append($("#" + divId));
        Sortable.create(document.getElementById("plans-holder"));
        $(this).attr("finalPlan", "true")
        console.log("inside of finalPlan true: " + $(this).attr("finalPlan"))
    }
    else {
        if (divCat === "sports") {
            $("#sportsList").append($("#" + divId));
            $(this).attr("finalPlan", "false")
        }
        if (divCat === "outdoor") {
            $("#outdoorList").append($("#" + divId));
            $(this).attr("finalPlan", "false")
        }
        if (divCat === "music") {
            $("#musicList").append($("#" + divId));
            $(this).attr("finalPlan", "false")
        }
        if (divCat === "pop") {
            $("#popList").append($("#" + divId));
            $(this).attr("finalPlan", "false")
        }
    }
    console.log("finalPlan: " + $(this).attr("finalPlan"))
})

$("body").on("click",".toggle", function () {
    console.log(this)
    var plus = $(this).attr("plus")
    if (plus === "true") {
        $(this).removeClass("fa-plus-square")
        $(this).addClass("fa-minus-square")
        $(this).attr("plus", "false")
    }
    else {
        $(this).removeClass("fa-minus-square")
        $(this).addClass("fa-plus-square")
        $(this).attr("plus", "true")
    }
})