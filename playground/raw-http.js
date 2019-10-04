const https = require('https');
const url = `https://api.darksky.net/forecast/${process.env.API_KEY}/40,-75?units=si`;

const request = https.request(url, response => {
  let data = '';

  response.on('data', chunk => {
    data += chunk.toString();
  });

  response.on('end', chunk => {
    const body = JSON.parse(data);
    console.log(body);
  });
});

request.on('error', error => {
  console.log('An error', error);
});

request.end();
