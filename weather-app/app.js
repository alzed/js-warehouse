const geocode = require('./utils/geocode');
const weather = require('./utils/weather');

geocode('Chennai', (error, data) => {
    if (error) {
        console.log('Error:', error);
    } else {
        console.log('Latitude: ', data.latitude);
        console.log('Longitude: ', data.longitude);
    }
});

weather(13.09, 80.27, (error, data) => {
    if (error) {
        console.log('Error:', error);
    } else {
        console.log('Weather: ', data.weather);
        console.log('Temperature: ', data.temperature);
    }
});
