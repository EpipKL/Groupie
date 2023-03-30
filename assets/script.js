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
        discography.textContent = 'Discography';
        getDiscogs();
        getLast();
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
const queryLast = 'http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist='+bandName+'&api_key='+lastKey+'&format=json'
const bioDiv = document.querySelector('#bio');

function getLast() {
    fetch('http://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist='+bandName+'&api_key='+lastKey+'&format=json')
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
