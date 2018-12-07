const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true,
        },
    })
    .help()
    .alias('help', 'h')
    .argv;
    
const KEY = '';    
let encodedAddress = encodeURIComponent(argv.address);
let geocodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${KEY}`;

axios.get(geocodeURL).then(response => {
    if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find that address.');
    }
    console.log(response.data);
}).catch(error => {
    if (error.code === 'ENOTFOUND') {
        console.log('Unable to connect to API servers.');
    } else {
        console.log(error.message);
    }
});
