var currentLocations
var blah
var eventStuff = {}
dateTime = "2018092800-2018093000"
var eventType = {
    outdoors: "&category=outdoors_recreation,festivals_parades&within=25&page_number=1&page_size=6&sort_order=popularity&date=",
    sports: "&category=sports&within=25&page_number=1&page_size=6&sort_order=popularity&date=",
    music: "&category=music&within=25&page_number=1&page_size=6&sort_order=popularity&date="
}
var cat = []
function api(one, two) {
    // We then created an AJAX call
    var term = one

    var qURL = {
        "weather": "https://api.openweathermap.org/data/2.5/forecast?zip=" + term + ",us&appid=72d410207aa89fc738de834c645b81d4",
        "event": "http://api.eventful.com/json/events/search?app_key=xQgjJDpnCN8V5Tn7&location=" + term,
        "geo": "https://api.ipgeolocation.io/ipgeo?apiKey=dacd7d606fcd4609a50e99daa7bb3699"
    }

    queryURL = qURL[two]
    $.ajax({
        url: queryURL,
        method: "GET"

    }).then(function (response) {
        if (two === "event") {
            response = JSON.parse(response)
            var ePhoto
            for (let j = 0; j < 6; j++) {
                if (response.events.event[j].image !== null) {
                    ePhoto = response.events.event[j].image.thumb.url
                }
                else {
                    ePhoto = "https://www.fillmurray.com/50/50"
                }
                eventStuff = {
                    title: response.events.event[j].title,
                    poster: ePhoto,
                    description: response.events.event[j].description,
                    time: response.events.event[j].start_time,
                    url: response.events.event[j].url,
                    category: blah
                }
                cat.push(eventStuff)
            }
            console.log(cat)
        }
        else if (two === "geo") {
            currentLocations = response.city
            document.getElementById("locationz").defaultValue = currentLocations;
        }
    })
}

api("", "geo")
function apiCall(one, two) {
    for (let index = 0; index < eventParameters.length; index++) {
        blah = eventParameters[index]
        var eventpiece = eventType[blah]
        var full = one + eventpiece
        api(full, "event")
    }
}
