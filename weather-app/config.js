const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    weather_api_key: process.env.WEATHER_API_KEY,
    geo_api_key: process.env.GEO_API_KEY
};
