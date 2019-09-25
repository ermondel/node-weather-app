const request = require('request');
const geocode = require('./geocode');

const url = `https://api.darksky.net/forecast/${process.env.API_KEY}/37.8267,-122.4233?units=si`;

request({ url, json: true }, (error, response) => {
  if (error) {
    console.log('Unable to connect to weather service.');
  } else if (response.body.error) {
    console.log('Unable to find location.');
  } else {
    const forecast = {
      temp: response.body.currently.temperature,
      rain: response.body.currently.precipProbability,
      firstDay: response.body.daily.data[0].summary
    };

    console.log(
      `${forecast.firstDay} It is currently ${forecast.temp} degrees out. There is a ${forecast.rain}% chance of rain.`
    );
  }
});

geocode('Boston', (error, data) => {
  console.log('Error', error);
  console.log(data);
});
