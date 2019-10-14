const request = require('request');

const getWeather = (lat, lng, callback) => {
  request(
    {
      url: `https://api.darksky.net/forecast/${process.env.NWA_DARKSKY_API_KEY}/${lat},${lng}?units=si`,
      json: true
    },
    (error, response, body) => {
      if (error) {
        callback('Unable to connect to Darksky.net server.');
      } else if (response.statusCode === 400) {
        callback('The given location is invalid.');
      } else if (response.statusCode === 200) {
        callback(undefined, {
          temperature: body.currently.temperature,
          apparentTemperature: body.currently.apparentTemperature
        });
      } else {
        callback('Unknown response from Darksky.net server.');
      }
    }
  );
};

module.exports = { getWeather };
