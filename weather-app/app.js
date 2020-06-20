const request = require('request');
const config = require('./config');

const geocode = require('./utils/geocode');

const weatherApi = config.weather_api_key;
const weatherUrl = `http://api.weatherstack.com/current?access_key=${weatherApi}&query=Chennai`;

request({url: weatherUrl, json:true},
    (error, response) => {
        let current = response.body.current;
        console.log(`${current.weather_descriptions[0]}. Current temperature is ${current.temperature} degree Celcius`);
    }); 


geocode('1', (error, data) => {
    if (error) {
        console.log('Error', error);
    } else {
        console.log('Latitude: ', data.latitude);
        console.log('Longitude: ', data.longitude);
    }
});
