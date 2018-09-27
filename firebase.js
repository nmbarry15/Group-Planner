// SIMULATED PLACEHOLDER API RETURNS
var eventTitle = "Test Title";
var eventPoster = "http://d1marr3m5x4iac.cloudfront.net/images/thumb/I0-001/041/067/406-9.jpeg_/indecision-live-music-yard-06.jpeg";
var eventDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vitae sollicitudin metus. Etiam imperdiet accumsan sem, vel dictum elit porta eget. Praesent varius eros in odio molestie, eget rutrum dui.";
var eventTime = "04:30";
var eventUrl = "http://charlotte.eventful.com/events/indecision-live-music-yard-/E0-001-117653619-8?utm_source=apis&utm_medium=apim&utm_campaign=apic";

// If you are doing a firebase call in other files make sure you use firebase.database()
// because this file isn't necasarrily loaded first.
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
    var display = $("#eventHolder");

    var displayTitle = $("<p>").text(snap.val().title);
    var displayPoster = $("<img>").attr("src", snap.val().poster);
    var displayDescription = $("<p>").text(snap.val().description);
    var displayTime = $("<p>").text(snap.val().time);
    var displayUrl = $("<a>").attr("href", snap.val().url);

    displayUrl.append(displayTitle, displayPoster, displayDescription, displayTime);
    display.append(displayUrl);
})



