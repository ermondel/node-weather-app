const request = require('request');

const forecast = (latitude, longitude, callback, units = 'si') => {
  const url = `https://api.darksky.net/forecast/${process.env.API_KEY}/${latitude},${longitude}?units=${units}`;

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback('Unable to connect to weather service.', undefined);
    } else if (body.error) {
      callback('Unable to find location.', undefined);
    } else {
      const forecast = {
        temp: body.currently.temperature,
        rain: body.currently.precipProbability,
        firstDay: body.daily.data[0].summary
      };

      callback(
        undefined,
        `${forecast.firstDay} It is currently ${forecast.temp} degrees out. There is a ${forecast.rain}% chance of rain.`
      );
    }
  });
};

module.exports = forecast;
