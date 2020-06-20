const geocode = require('./utils/geocode');
const weather = require('./utils/weather');

geocode('Chennai', (error, data) => {
    if (error) {
        console.log('Error:', error);
    } else {
        weather(data.latitude, data.longitude, (error, forecast) => {
            if (error) {
                console.log('Error:', error);
            } else {
                let location = `${forecast.location}, ${forecast.region}, ${forecast.country}`;
                console.log(location);
                console.log('Weather: ', forecast.weather);
                console.log('Temperature: ', forecast.temperature);
            }
        });
    }
});
