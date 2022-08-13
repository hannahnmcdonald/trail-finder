// Imports
const axios = require("axios");
const {
    response
} = require("express");
// Declare variables
var ZIP_KEY = process.env.ZIP_API_KEY
var TRAIL_KEY = process.env.TRAIL_API_KEY
var RAPID_KEY = process.env.RAPID_KEY

// Use Zip code API to convert zip code to lat and long to pass into trail api
const zipAPI = () => {
    const zipOptions = {
        method: 'GET',
        url: `https://www.zipcodeapi.com/rest/${ZIP_KEY}/info.json/${zipCode}/degrees`
    }

    axios.request(zipOptions).then(function (response) {
        console.log(response.data.lat, response.data.lon);
        trailAPI(response.data);
    }).catch(function (error) {
        console.error(error);
    })
}

// Use trail api to retrieve trails with lat and lon
const trailAPI = () => {
    const options = {
        method: 'GET',
        url: 'https://trailapi-trailapi.p.rapidapi.com/trails/explore/',
        params: {
            lat: response.data.lat,
            lon: response.data.lon
        },
        headers: {
            'X-RapidAPI-Key': TRAIL_KEY,
            'X-RapidAPI-Host': RAPID_KEY
        }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    })
};