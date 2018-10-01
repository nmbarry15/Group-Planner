//take info from form and make variables on click
var eventParameters= ["popular"];
var emails = [];
$("#submit-btn").on("click", function (event) {
    event.preventDefault();
    var locationz = $("#locationz").val().trim();
    var startDate = $("#start-date").val().trim();
    var endDate = $("#end-date").val().trim();

    if ($("#outdoor-check").prop( "checked" )){
        eventParameters.push("outdoors");
    }
    if ($("#sports-check").prop( "checked" )){
        eventParameters.push("sports");
    }
    if ($("#music-check").prop( "checked" )){
        eventParameters.push("music");
    }
console.log(eventParameters)
    if((locationz==="")||(startDate==="")||(endDate==="")){
        $("#NO").remove();
        $("#trip-info").prepend('<h1 class="title is-3 has-text-danger" id="NO">Please fill in all fields.</h1>')
        eventParameters=["popular"];
    } else {
    initializeGroupKey();
    
    // opening the send plans modal
    $("#send-plans-modal").addClass("is-active")

  
    locationz= sParameter = encodeURIComponent(locationz.trim()) // changes spaces to %20
    var dateTime = moment(startDate).format("YYYYMMDD")+"00-"+ moment(endDate).format("YYYYMMDD")+"00"
    var holdIt=locationz + "&date=" + dateTime
    apiCall( holdIt, "event")
}})

// opening the view plans modal
$("#view-plans-button").on("click", function (event) {
    event.preventDefault();
    $("#view-plans-modal").addClass("is-active")
    if (localStorage.hasOwnProperty('username')){
        $("#username").val(localStorage.getItem("username"))
    }  
    if (localStorage.hasOwnProperty('groupKey')){
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
    if(($("#email0").val().trim()==="")||($("#group-name").val().trim()==="")||($("#screen-name").val().trim()==="")){
        console.log("HAAAAAAAAAAAY")
        $("#no-sir").remove();
        $("#send-plans-modal-body").prepend('<h1 class="title is-3 has-text-danger" id="no-sir">Group name, screen name, and your email are required.</h1>')
    } else{
    var screenName= $("#screen-name").val()
    var groupName= $("#group-name").val()
    localStorage.setItem("username", screenName);
    for (i=0; i<11; i++){
        var email = $("#email"+i).val().trim()
        if (email !== ""){
            emails.push(email)
            console.log(emails)
        }
    }
    emailSend()
    // store group name locally, in firebase, or both?
    //store event key locally, in firebase, or both?
    window.location = "planner.html"
}})

// view plans button storing info and redirecting
$("#view-plans-submit-button").on("click", function (event) {
    event.preventDefault();
    if (($("#username").val().trim()!=="")&&($("#plan-key").val().trim()!=="")){
    var screenName= $("#username").val().trim()
    localStorage.setItem("username", screenName);
    // store group name locally, in firebase, or both?
    //store event key locally, in firebase, or both?
    window.location = "planner.html"
    } else {
        $("#nope").remove();
        $("#view-plans-modal-body").prepend('<h1 class="title is-3 has-text-danger" id="nope">Plan key and screen name required.</h1>')}
})

// chat
function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}