const request = require('request');
const config = require('../config');

const weatherApi = config.weather_api_key;

const weather = (latitude, longitude, callback) => {
    const weatherUrl = `http://api.weatherstack.com/current?access_key=${weatherApi}&query=${latitude},${longitude}`;

    request({url: weatherUrl, json:true},
        (error, response) => {
            if (error) {
                callback('Unable to connect to weather services', undefined);
            } else if (response.body.error) {
                callback('Unable to find location', undefined);
            } else {
                callback(undefined, {
                    location: response.body.location.name, 
                    region: response.body.location.region,
                    country: response.body.location.country,
                    weather: response.body.current.weather_descriptions[0],
                    temperature: response.body.current.temperature   
                });
            }
        }    
    ); 
};

module.exports = weather;
