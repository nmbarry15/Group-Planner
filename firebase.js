// SIMULATED PLACEHOLDER API RETURNS
var eventTitle = "Test Title";
var eventPoster = "http://d1marr3m5x4iac.cloudfront.net/images/thumb/I0-001/041/067/406-9.jpeg_/indecision-live-music-yard-06.jpeg";
var eventDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vitae sollicitudin metus. Etiam imperdiet accumsan sem, vel dictum elit porta eget. Praesent varius eros in odio molestie, eget rutrum dui.";
var eventTime = "04:30";
var eventUrl = "http://charlotte.eventful.com/events/indecision-live-music-yard-/E0-001-117653619-8?utm_source=apis&utm_medium=apim&utm_campaign=apic";

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAxAKCUoVsIwle4B3Ot1Kx4rmv-XelD0OE",
    authDomain: "group-planner-93fd0.firebaseapp.com",
    databaseURL: "https://group-planner-93fd0.firebaseio.com",
    projectId: "group-planner-93fd0",
    storageBucket: "group-planner-93fd0.appspot.com",
    messagingSenderId: "289913769436"
};

firebase.initializeApp(config);

var database = firebase.database();
var plansDirectory = database.ref("/plans");

var placeholderEventObject = {
    title: eventTitle,
    poster: eventPoster,
    description: eventDescription,
    time: eventTime,
    url: eventUrl
}

plansDirectory.push(placeholderEventObject)

plansDirectory.on("child_added", function (snap) {
    console.log(snap.val());
    // console.log(snap.val().title);
    // console.log(snap.val().poster);
    // console.log(snap.val().description);
    // console.log(snap.val().time);
    // console.log(snap.val().url);
})



