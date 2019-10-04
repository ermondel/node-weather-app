const request = require('request');

const forecast = (latitude, longitude, callback, units = 'si') => {
  const url = `https://api.darksky.net/forecast/${process.env.API_KEY}/${latitude},${longitude}?units=${units}`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to weather service.', undefined);
    } else if (response.body.error) {
      callback('Unable to find location.', undefined);
    } else {
      const forecast = {
        temp: response.body.currently.temperature,
        rain: response.body.currently.precipProbability,
        firstDay: response.body.daily.data[0].summary
      };

      callback(
        undefined,
        `${forecast.firstDay} It is currently ${forecast.temp} degrees out. There is a ${forecast.rain}% chance of rain.`
      );
    }
  });
};

module.exports = forecast;
