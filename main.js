function apiCall(one, two) {
    // We then created an AJAX call
    var term = one

    var qURL = {
        "weather": "https://api.openweathermap.org/data/2.5/forecast?zip=" + term + ",us&appid=72d410207aa89fc738de834c645b81d4",
        "event": "http://api.eventful.com/json/events/search?app_key=xQgjJDpnCN8V5Tn7&"+term,
        "geo": "https://api.ipgeolocation.io/ipgeo?apiKey=dacd7d606fcd4609a50e99daa7bb3699"
    }
    
    queryURL = qURL[two]
    console.log(queryURL)
    $.ajax({
        url: queryURL,
        method: "GET"

    }).then(function (response) {
        response=JSON.parse(response)
        console.log(response.last_item)
    })
}

apiCall("where=28202&within=25","event" )