const geocode = require('./geocode');
const forecast = require('./forecast');

geocode('Boston', (error, data) => {
  if (error && !data) console.log('Error', error);
  if (!error && data) {
    forecast(data.latitude, data.longitude, (error, data) => {
      if (error && !data) console.log('Error', error);
      if (!error && data) console.log(data);
    });
  }
});
