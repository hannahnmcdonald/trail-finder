// Declare variables
var ZIP_KEY = process.env.ZIP_API_KEY
var TRAIL_KEY = process.env.TRAIL_API_KEY

// Use Zip code API to convert zip code to lat and long to pass into trail api

function getLocation() {
    
    // Zip Code entered by User
    var ZIPCODE = zipSearch.value;

    // If none entered, alert user
    if (!ZIPCODE) {
        window.alert('Please enter a zip code!');
    }

    var locationUrl =`https://www.zipcodeapi.com/rest/${ZIP_KEY}/info.json/${ZIPCODE}/degrees`
    
    // TEST: console.log(ZIPCODE);
    
    fetch(locationUrl).then(function (response) {
        if (!response.ok) {
            console.log(response.status);
        }

        return response.json();

    }).then(function (data) {
        console.log("data", data);
        if (data.count < 5) {
            window.alert("this is not a valid zipcode!");
        }

        // API DATA:
        var LAT = data.lat;
        var LON = data.lng;

        // Pass into next fx
        searchTrails(LAT, LON);

    }).catch(function() {
        window.alert("Something went wrong");
    });

}

function searchTrails (LAT, LON) {

    fetch(`https://trailapi-trailapi.p.rapidapi.com/trails/explore/?lat=${LAT}&lon=${LON}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "trailapi-trailapi.p.rapidapi.com",
            "x-rapidapi-key": TRAIL_KEY
        }
    })
    .then(response => {
        console.log(response);

        const returnedTrailData = data.data;
        // API DATA:
        const trailData = returnedTrailData.map((data) => ({
            ID = data.id,
            LAT = data.lat,
            LON = data.lng,
            NAME = data.name,
            URL = data.url, 
            LENGTH = data.length,
            DESC = data.description,
            DIRECTIONS = data.directions,
            CITY = data.city,
            REG = data.region,
            DIF = data.difficulty,
            FEAT = data.features,
            RATING = data.rating,
            PIC = data.thumbnail
        }));
    })
    .catch(err => {
        console.error(err);
    });
}
