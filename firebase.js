var database = firebase.database();
var groupsRef = database.ref("groups/")
var groupKey;
var eventsRef;
if ( $("#checker").attr("value")==="true" ) {
    console.log("hello is it me")
    localStorage.removeItem("groupKey");
}


// Initialize Group Directory
// This function is called in main.js on the submit button.
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
        localStorage.removeItem("groupKey");
        localStorage.setItem("groupKey", snap.key);
        console.log("groupKey from localstor: " + localStorage.getItem("groupKey"));
        eventsRef = database.ref("groups/" + localStorage.getItem("groupKey") + "/apiData/");
    }) 
}

// This pushes data to database, and the one input would be the "cat" array in the instance of api.js line 47.
function pushApiData(data) {
    console.log("This is the key being used to push: " + localStorage.getItem("groupKey"));
    eventsRef.set(data);
    console.log("Events have been pushed to database.")
}

// This function can be used to construct DOM elements with returned data. The "category" input takes one word string element associated with category you'd like to return.
// ie: "sport", "music", "outdoors"
function returnEvents(category) {
    eventsRef.orderByChild("category").equalTo(category).on("child_added", function(snap) {
            console.log("--LOOPING CURRENT CHILD--")
            console.log(snap.val());
        // IN THIS INSTANCE YOU WOULD USE SNAP FOR EACH EVENT YOUR GOING TO RETURN AND THEN WRITE JQUERY HTML CONSTRUCTORS HERE
        // THEN APPEND YOUR NEW ELEMENTS TO DISPLAY DIV FOR EACH CATEGORY.
    });
}

// This function can be used to set data to the currect group keys database. By default it writes,
// directly into the push-id value directory. The first argument is taken as an object, the second,
// is a string with the new or existing database reference you would like to write to.
function setData(data, directory = "") {
    database.ref("groups/" + localStorage.getItem("groupKey") + "/" + directory).set(data);
}

// Use this code to push variable groupname to the database directly inside the group key.
// setData(groupName) 