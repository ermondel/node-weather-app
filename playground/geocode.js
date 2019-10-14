const request = require('request');

let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/{address}.json?access_token={key}&limit=1`;
const errors = {
  connect: 'Unable to connect to location service.',
  location: 'Unable to find location. Try another search.'
};

const geocode = (address, callback) => {
  url = url.replace('{address}', encodeURIComponent(address));
  url = url.replace('{key}', process.env.NWA_MAPBOX_API_KEY);

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback(errors.connect, undefined);
    } else if (response.body.features.length === 0) {
      callback(errors.location, undefined);
    } else {
      const data = {
        longitude: response.body.features[0].center[0],
        latitude: response.body.features[0].center[1],
        location: response.body.features[0].place_name
      };

      callback(undefined, data);
    }
  });
};

module.exports = geocode;
