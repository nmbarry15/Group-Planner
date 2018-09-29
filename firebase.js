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
        localStorage.removeItem("groupKey");
        localStorage.setItem("groupKey", snap.key);
        console.log("groupKey from localstor: " + localStorage.getItem("groupKey"));
        eventsRef = database.ref("groups/" + localStorage.getItem("groupKey") + "/apiData/");
    }) 
}

function pushApiData(data) {
    console.log("This is the key being used to push: " + localStorage.getItem("groupKey"));
    eventsRef.set(data);
    console.log("Events have been pushed to database.")
}

function returnEvents(category) {
    eventsRef.orderByChild("category").equalTo(category).on("child_added", function(snap) {
        console.log("--LOOPING CURRENT CHILD--")
        console.log(snap.val());
    });
}