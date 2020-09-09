const request = require('request');

let url = 'https://api.darksky.net/forecast/{key}/{lat},{long}?units={un}';
const errors = {
  connect: 'Unable to connect to weather service.',
  location: 'Unable to find location.',
};

const forecast = (latitude, longitude, callback, units = 'si') => {
  url = url.replace('{key}', process.env.NWA_DARKSKY_API_KEY);
  url = url.replace('{lat}', latitude);
  url = url.replace('{long}', longitude);
  url = url.replace('{un}', units);

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback(errors.connect, undefined);
    } else if (response.body.error) {
      callback(errors.location, undefined);
    } else {
      let forecast = `${response.body.daily.data[0].summary} \n`;
      forecast += `It is currently ${response.body.currently.temperature} degrees out. \n`;
      forecast += `There is a ${response.body.currently.precipProbability}% chance of rain. \n`;

      callback(undefined, forecast);
    }
  });
};

module.exports = forecast;
