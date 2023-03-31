const apiKey = 'BuTjcTSMjIfxFGWSJNPo'
const apiSecret = 'RHsXCGkbukoTWkHeCzBHZPspCYGEPPXG'
let bandName;
const queryDiscogs = 'https://api.discogs.com/database/search?artist='+bandName+'&type=release&key='+apiKey+'&secret='+apiSecret;
const search = document.querySelector('#search');
const input = document.querySelector('.input');
const discography = document.querySelector('#discography');


// button click for search artists -- clears content and initiates API fetch's
search.addEventListener('click', () => {
        bandName = input.value;
        discography.innerHTML = ''
        bioDiv.innerHTML = '';
        tour.innerHTML = '';
        discography.textContent = 'Discography';
        getDiscogs();
        getLast();
        getTicket();
})

// get album cover images and titles from Discogs API
let discImage = [];
let discImageEl = [];
let discTitle = [];
let discTitleEl = [];

function getDiscogs() {
    fetch('https://api.discogs.com/database/search?artist='+bandName+'&type=release&key='+apiKey+'&secret='+apiSecret)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            for (let i = 0; i < data.results.length; i++) {
                if (data.results[i].country === 'US') {
                    discImage[i] = data.results[i].thumb;
                    discTitle[i] = data.results[i].title
                    discImageEl[i] = document.createElement('img');
                    discTitleEl[i] = document.createElement('a');
                    discImageEl[i].setAttribute('src', discImage[i]);
                    discTitleEl[i].textContent = discTitle[i];
                    discography.appendChild(discImageEl[i]);
                    discography.appendChild(discTitleEl[i]);
                }else {
                }
            }
        })
}

// function to call the lastFM API to get bio
const lastKey = 'f54a71e4cffac64ddae0c640e1c20b04'
const lastSecret = '1a1cfb229ad5b54371350b86f7a4c32a'
const queryLast = 'https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist='+bandName+'&api_key='+lastKey+'&format=json'
const bioDiv = document.querySelector('#bio');

function getLast() {
    fetch('https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist='+bandName+'&api_key='+lastKey+'&format=json')
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            const bio = data.artist.bio.content;
            const bioEl = document.createElement('p');
            bioEl.textContent = bio;
            bioDiv.appendChild(bioEl);
        })
}

const ticketKey = 'UcycjsGfTYWd0RhGEctxiUWtpRjqQXm8'
const ticketSecret = 'HWE3OUWKExknLpdY'
let city = 'Denver';
const photo = document.querySelector('#photo');
const tour = document.querySelector('#tour');

let tourDate = [];
let tourVenue = [];
let tourCity = [];
let tourState = [];
let tourEl = [];

function getTicket() {
    fetch('https://app.ticketmaster.com/discovery/v2/events.json?keyword='+bandName+'&countryCode=US&sort=date,asc&apikey='+ticketKey)
        .then(function(response){
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            for (let i = 0; i < 10; i++) {
                tourDate[i] = data._embedded.events[i].dates.start.localDate;
                tourVenue[i] = data._embedded.events[i]._embedded.venues[0].name;
                tourCity[i] = data._embedded.events[i]._embedded.venues[0].city.name;
                tourState[i] = data._embedded.events[i]._embedded.venues[0].state.stateCode;
                tourEl[i] = document.createElement('button');
                tourEl[i].classList.add('button');
                tourEl[i].classList.add('is-success');
                tourEl[i].textContent = tourCity[i] + ', ' + tourState[i] + " | " + tourVenue[i] + " | " + tourDate[i];
                tour.appendChild(tourEl[i]);
            }
        })
}

// variables and open/close functions for modal
const discModal = document.querySelector('#disc-modal');
const discBtn = document.querySelector('#disc-modal-btn');
const discCloseBtn = document.querySelector('#disc-close');

discBtn.addEventListener('click', () => {
    discModal.classList.add('is-active');
})   
discCloseBtn.addEventListener('click', () => {
    discModal.classList.remove('is-active');
})  

// SEAT GEEK API --- NOT THAT GREAT, SAVE FOR LATER
// const seatId = 'MTE1Mjc5NzB8MTY4MDIyMzkzNy4wNDg4ODY1'
// const seatSecret = '748b.......'
// const querySeat = 'https://api.seatgeek.com/2/performers?q='+bandName+'client_id='+seatId;

// function getSeat() {
//     fetch('https://api.seatgeek.com/2/performers?slug='+bandName+'&client_id='+seatId)
//         .then(function(response) {
//             return response.json();
//         })
//         .then(function(data) {
//             console.log(data);
//         })
// }