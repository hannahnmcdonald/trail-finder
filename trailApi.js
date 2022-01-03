// Declare variables
var ZIP_KEY = process.env.ZIP_API_KEY
var TRAIL_KEY = process.env.TRAIL_API_KEY

// Use Zip code API to convert zip code to lat and long to pass into trail api

function getLocation() {
    
    var ZIPCODE = zipSearch.value;

    if (!ZIPCODE) {
        window.alert('Please enter a zip code!');
    }

    var locationUrl =`https://www.zipcodeapi.com/rest/${ZIP_KEY}/info.json/${ZIPCODE}/degrees`
    
        console.log(ZIPCODE);
    
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
            "x-rapidapi-key": "SIGN-UP-FOR-KEY"
        }
    })
    .then(response => {
        console.log(response);
    })
    .catch(err => {
        console.error(err);
    });
}
