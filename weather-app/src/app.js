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
}
