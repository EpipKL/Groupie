const apiKey = 'BuTjcTSMjIfxFGWSJNPo'
const apiSecret = 'RHsXCGkbukoTWkHeCzBHZPspCYGEPPXG'
let bandName;
const queryDiscog = 'https://api.discogs.com/database/search?q=' + bandName + '&key=' + apiKey + '&secret=' + apiSecret;

bandName = 'Nirvana'
fetch(queryDiscog)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
    })