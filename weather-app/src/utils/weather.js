const axios = require('axios');
const config = require('../config');

const weatherApi = config.weather_api_key;

const weather = (latitude, longitude) => {
    const weatherUrl = `http://api.weatherstack.com/current?access_key=${weatherApi}&query=${latitude},${longitude}`;

    const weatherData = axios({
        method: 'get',
        url: weatherUrl, 
        responseType: 'json'
    }).then(response => {
        if (response.data.error) {
            return { 'error': 'Unable to find location' };
        } else {
            return {
                location: response.data.location.name, 
                region: response.data.location.region,
                country: response.data.location.country,
                weather: response.data.current.weather_descriptions[0],
                temperature: response.data.current.temperature,
                image: response.data.current.weather_icons[0]   
            };
        }    
    }).catch(error => {
        return { 'error': 'Unable to connect to weather services' };
    }); 

    return weatherData;
};

module.exports = weather;
