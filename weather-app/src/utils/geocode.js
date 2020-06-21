const request = require('request');
const config = require('../config');

const geoApi = config.geo_api_key; 

const geocode = (address, callback) => {

    const encodedAddress = encodeURIComponent(address);
    const geoUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${geoApi}`;

    request({url: geoUrl, json:true},
        (error, response) => {
            if (error) {
                callback('Unable to connect to geolocation servers', undefined);
            } else if (response.body.message === 'Not Found' || response.body.features.length === 0) {
                callback('Unable to find location', undefined);
            } else {
                callback(undefined, {
                    latitude: response.body.features[0].center[1],
                    longitude: response.body.features[0].center[0]
                });
            }
        }
    );
};

module.exports = geocode;
