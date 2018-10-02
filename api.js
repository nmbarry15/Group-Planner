var currentLocations
var latlocation
var latLng
var blah
var dayCount
var dateCompareE
var dateCompareS
var eventStuff = {}
var weatherArr = []
var weatherIcon = []

var eventType = {
    outdoors: "&category=outdoors_recreation,festivals_parades&within=25&page_number=1&page_size=6&sort_order=popularity",
    sports: "&category=sports&within=25&page_number=1&page_size=6&sort_order=popularity",
    music: "&category=music&within=25&page_number=1&page_size=6&sort_order=popularity",
    popular: "&within=25&page_number=1&page_size=6&sort_order=popularity"
}
var cat = []
function api(one, two, three) {
    // We then created an AJAX call
    var term = one
    console.log(term)
    var qURL = {
        "weather": "https://api.darksky.net/forecast/36457112d298063090f6be502522136c/" + term + "?exclude=currently,minutely,hourly",
        "event": "http://api.eventful.com/json/events/search?app_key=xQgjJDpnCN8V5Tn7&location=" + term,
        "geo": "https://api.ipgeolocation.io/ipgeo?apiKey=dacd7d606fcd4609a50e99daa7bb3699",
        "lat": 'https://api.opencagedata.com/geocode/v1/json?q=' + term + '&key=e58ea256ed4a4edd9a32ff832ab70ef2&language=en&pretty=1&limit=1'
    }

    queryURL = qURL[two]
    console.log(queryURL)
    $.ajax({
        url: queryURL,
        method: "GET"

    }).then(function (response) {
        if (two === "event") {
            response = JSON.parse(response)
            for (let j = 0; j < 6; j++) {
                eventStuff = {
                    title: response.events.event[j].title,
                    description: response.events.event[j].description,
                    time: response.events.event[j].start_time,
                    url: response.events.event[j].url,
                    category: three
                }
                cat.push(eventStuff)
            }
            api(latlocation, "lat")
            pushApiData(cat);

        }
        else if (two === "geo") {
            currentLocations = response.city +" "+ response.state_prov
            document.getElementById("locationz").defaultValue = currentLocations;
            document.getElementById("start-date").defaultValue = moment().format('YYYY-MM-DD');
            document.getElementById("end-date").defaultValue = moment().add(1, 'days').format('YYYY-MM-DD');
        }
        else if (two === "lat") {
            latLng = response.results[0].geometry.lat + "," + response.results[0].geometry.lng
            console.log(latLng)
            api(latLng, "weather")
        }
        else if (two === "weather") {
            dateCompareS = moment(startDate).format("X")
            dateCompareE = moment(endDate).format("X")
            var diff = dateCompareS - moment().format("X")
            var eventLength = (dateCompareE - dateCompareS) / 86400
            var daysTill = Math.floor(diff / 86400)
            if (daysTill < 0) { daysTill = 0 }
            dayCount = daysTill
            if (dayCount !== 0) {
                dayCount++
            }
            console.log(dayCount)
            if (eventLength + daysTill > 7) { eventLength = eventLength - (eventLength + daysTill - 7) }
            if (daysTill < 7) {
                weatherArr = []
                weatherIcon = []
                for (let index = 0; index < eventLength; index++) {
                    var tempHolder = response.daily.data[dayCount].icon
                    tempHolder = tempHolder.replace(/-+/g, " ");

                    if ((tempHolder.indexOf("clear")) !== -1) {
                        weatherIcon.push('<i class="fas fa-sun"></i>')
                    }
                    else if ((tempHolder.indexOf("rain")) !== -1 || (tempHolder.indexOf("sleet")) !== -1) {
                        weatherIcon.push('<i class="fas fa-umbrella"></i>')
                    }
                    else if ((tempHolder.indexOf("snow")) !== -1) {
                        weatherIcon.push('<i class="fas fa-snowflake"></i>')
                    }
                    else if ((tempHolder.indexOf("wind")) !== -1 || (tempHolder.indexOf("cloudy")) !== -1 || (tempHolder.indexOf("fog")) !== -1) {
                        weatherIcon.push('<i class="fas fa-cloud"></i>')
                    }
                    weatherArr.push(tempHolder)
                    dayCount++
                }
                console.log(weatherIcon)
                console.log(weatherArr)

                // var weatherData = {
                //     icon: weatherIcon,
                //     forecast: weatherArr,
                //     forecastStartDate: $("#start-date").val().trim()
                // }
                // database.ref("groups/" + localStorage.getItem("groupKey") + "/weather").set(weatherData);
            }
        }
    })
}

api("", "geo")
function apiCall(one, two) {
    for (let index = 0; index < eventParameters.length; index++) {
        blah = eventParameters[index]
        console.log(blah)
        var eventpiece = eventType[blah]
        var full = one + eventpiece
        api(full, "event", blah)
    }

}
// email stuff below
var templateParams
function emailSend() {
    console.log(emails)
    var intName = localStorage.getItem("groupKey")
    var emailAdds = emails.join(", ");
    templateParams = {
        from_name: screenName,
        key: intName,
        toEmail: emailAdds,
    };
    console.log(templateParams)
    // emailjs.send('groupplanneremail_gmail_com', 'sendkey', templateParams).then(function (response) {
    //     console.log('SUCCESS!', response.status, response.text);
    // }, function (error) {
    //     console.log('FAILED...', error);
    // });
}