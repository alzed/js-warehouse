const axios = require('axios');
const config = require('../config');

const geoApi = config.geo_api_key; 

const geocode = (address) => {

    const encodedAddress = encodeURIComponent(address);
    const geoUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${geoApi}`;

    const coordinates = axios({
        method: 'get',
        url: geoUrl,
        resposeType: 'json'
    }).then(response => {
        if (response.data.message === 'Not Found' || response.data.features.length === 0) {
            return { 'error': 'Unable to find location' };
        } else {
            return {
                latitude: response.data.features[0].center[1],
                longitude: response.data.features[0].center[0]
            };
        }
    }).catch(error => {
        return { 'error': 'Unable to connect to geolocation servers' };
    });

    return coordinates;
};

module.exports = geocode;
