const geocode = require('./geocode');
const forecast = require('./forecast');

const address = process.argv[2];
if (address) {
  const error = geocode(
    address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) return console.log(error);

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) return console.log(error);

        console.log(address, '(' + location + ')');
        console.log(forecastData);
      });
    }
  );

  if (error) console.log(error);
} else {
  console.log('Please provide an address');
}
