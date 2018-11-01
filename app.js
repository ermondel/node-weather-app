const request = require('request');

request({
    url: 'https://maps.googleapis.com/maps/api/geocode/json?address=1301%20lombard%20street%20philadelphia&key=AIzaSyDirdpH1r56LgeKV1JNH0TXXxuf7LUW_H4',
    json: true
}, (error, response, body) => {
    console.log(body);
});