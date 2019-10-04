const geocode = require('./geocode');
const forecast = require('./forecast');

const address = process.argv[2];
if (address) {
  const error = geocode(address, (error, data) => {
    if (error) return console.log(error);

    if (!error && data) {
      forecast(data.latitude, data.longitude, (error, forecastData) => {
        if (error) return console.log(error);
        console.log(forecastData);
      });
    }
  });

  if (error) console.log(error);
} else {
  console.log('Please provide an address');
}
