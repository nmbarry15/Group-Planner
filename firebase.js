var database = firebase.database();
var groupsRef = database.ref("groups/")
var groupKey;
var eventsRef;

// Initialize Group Directory
function initializeGroupKey() {
    var groupSetup = {
        apiData: null,
        groupName: "User Input Name",
        selections: null
    };
    groupsRef.push(groupSetup);
    // LISTENER -- Sets group key into local store after key is made in firebase.
    groupsRef.once("child_added", function(snap) {
        console.log("// GROUPS REF LISTENER ACTIVATED //")
        localStorage.setItem("groupKey", snap.key);
        eventsRef = database.ref("groups/" + localStorage.getItem("groupKey") + "/apiData/");
    }) 
}

function returnEvents(category) {
    var eventsRef = database.ref("groups/" + localStorage.getItem("groupKey") + "/apiData/");
    eventsRef.orderByChild("category").equalTo(category).on("child_added", function(snap) {
        console.log("// EVENTS REF LISTENER ACTIVATED //")
        console.log(snap.val());
    });
}

//SIMULATED PLACEHOLDER API RETURNS
var eventTitle = "Test Title";
var eventPoster = "http://d1marr3m5x4iac.cloudfront.net/images/thumb/I0-001/041/067/406-9.jpeg_/indecision-live-music-yard-06.jpeg";
var eventDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vitae sollicitudin metus. Etiam imperdiet accumsan sem, vel dictum elit porta eget. Praesent varius eros in odio molestie, eget rutrum dui.";
var eventTime = "04:30";
var eventUrl = "http://charlotte.eventful.com/events/indecision-live-music-yard-/E0-001-117653619-8?utm_source=apis&utm_medium=apim&utm_campaign=apic";

// If you are doing a firebase call in other files make sure you use firebase.database()
// because this file isn't necasarrily loaded first.

var eventOne = {
        title: eventTitle,
        poster: eventPoster,
        description: eventDescription,
        time: eventTime,
        url: eventUrl,
        category: "sports"
    };

var eventTwo = {
    title: eventTitle,
    poster: eventPoster,
    description: eventDescription,
    time: eventTime,
    url: eventUrl,
    category: "nature"
}

var eventThree = {
    title: eventTitle,
    poster: eventPoster,
    description: eventDescription,
    time: eventTime,
    url: eventUrl,
    category: "nightlife"
}
var dataArray = [eventOne, eventTwo, eventThree];

// Push simulated array to db.
console.log(localStorage.getItem("groupKey"));
var eventsRef = database.ref("groups/" + localStorage.getItem("groupKey") + "/apiData/");
console.log("PUSHING DATA TO EVENTS REF");
console.log(eventsRef);
eventsRef.push(dataArray);
// ========================

// var groupKey = "-LNYfM4EgaQUCJtCGjHc"; -- THIS IS NOT GOING TO BE STANDARD - The key will be initialized on group creation or form submit.

// groupsRef.push(groupSetup);
// This we be implemented into a user response event.
// Either when they create a group and define it or when
// they create a new search result.

// groupsRef.on("child_added", function(snap) {
//     groupKey = snap.key;
// })

// var eventsRef = database.ref("groups/" + localStorage.getItem("groupKey") + "/apiData/");

// // RETURNS ALL EVENTS IN SPORTS CATEGORY
// function
// eventsRef.orderByChild("category").equalTo("sports").on("child_added", function(snap) {
//     console.log(snap.val());
// });

// // RETURNS ALL EVENTS IN NATURE CATEGORY
// eventsRef.orderByChild("category").equalTo("nature").on("child_added", function(snap) {
//     console.log(snap.val());
// });

// // RETURNS ALL EVENTS IN NIGHTLIFE CATEGORY
// eventsRef.orderByChild("category").equalTo("nightlife").on("child_added", function(snap) {
//     console.log(snap.val());
// });