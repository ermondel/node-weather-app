const request = require('request');

const getWeather = () => {
    const key = '';

    request({
        url: `https://api.darksky.net/forecast/${key}/39.9396284,-75.18663959999999`,
        json: true
    }, (error, response, body) => {
        if (error) {
    
            console.log('Unable to connect to Darksky.net server.');
    
        } else if (response.statusCode === 400) {
    
            console.log('The given location is invalid.');
    
        } else if (response.statusCode === 200) {
    
            console.log(body.currently.temperature);
    
        } else {
    
            console.log('Unknown response from Darksky.net server.');
    
        }
    }); 
};

module.exports = { getWeather };
