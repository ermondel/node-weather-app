const request = require('request');

const geocodeAddress = (address) => {
    const encodedAddress = encodeURIComponent(address);
    const key = 'AIzaSyDirdpH1r56LgeKV1JNH0TXXxuf7LUW_H4';

    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${key}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            console.log('Unable to connect to Google servers.');
        } else if (body.status === 'ZERO_RESULTS') {
            console.log('Unable to find that address.');
        } else if (body.status === 'OK') {
            console.log(`Address: ${body.results[0].formatted_address}`);
            console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
            console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
        } else {
            console.log('Unknown response from Google servers.');
        }
    });
}

module.exports = { geocodeAddress };