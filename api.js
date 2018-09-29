var currentLocations
var eventStuff = {}
var dateR = "2018092800-2018093000"
function apiCall(one, two) {
    // We then created an AJAX call
    var term = one

    var qURL = {
        "weather": "https://api.openweathermap.org/data/2.5/forecast?zip=" + term + ",us&appid=72d410207aa89fc738de834c645b81d4",
        "event": "http://api.eventful.com/json/events/search?app_key=xQgjJDpnCN8V5Tn7&location=" + term,
        "geo": "https://api.ipgeolocation.io/ipgeo?apiKey=dacd7d606fcd4609a50e99daa7bb3699"
    }

    queryURL = qURL[two]
    console.log(queryURL)
    $.ajax({
        url: queryURL,
        method: "GET"

    }).then(function (response) {
        if (two === "event") {
            console.log("event inside")
            response = JSON.parse(response)
            console.log(response.events.event[1].start_time)
            var ePhoto
            for (let j = 0; j < 5; j++) {
                if (response.events.event[j].image !==null){
                    console.log(response.events.event[j].image)
                    ePhoto = response.events.event[j].image.thumb.url
                }
                else{
                    ePhoto = "https://www.fillmurray.com/50/50"
                }
                eventStuff ={
                    title: response.events.event[j].title,
                    poster: ePhoto,
                    description: response.events.event[j].description,
                    time: response.events.event[j].start_time,
                    url: response.events.event[j].url
                }
                plansDirectory.push(eventStuff)
            }
        }
        else if (two === "geo") {
            currentLocations = response.city
            document.getElementById("locationz").defaultValue = currentLocations;
            //$(".locationz").prev('input').val(response.city);
            
        }
    })
}

apiCall("", "geo")
//apiCall("where=28202&within=25","event" )