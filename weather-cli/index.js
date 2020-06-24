const geocode = require('./utils/geocode');
const weather = require('./utils/weather');

const address = process.argv[2];

if (!address) {
    console.log('Please provide an address');
} else {
    geocode(address, (error, data) => {
        if (error) {
            console.log('Error:', error);
        } else {
            weather(data.latitude, data.longitude, (error, forecastData) => {
                if (error) {
                    console.log('Error:', error);
                } else {
                    let location = `${forecastData.location}, ${forecastData.region}, ${forecastData.country}`;
                    console.log(location);
                    console.log('Weather: ', forecastData.weather);
                    console.log('Temperature: ', forecastData.temperature);
                }
            });
        }
    });
}
