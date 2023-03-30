const apiKey = 'BuTjcTSMjIfxFGWSJNPo'
const apiSecret = 'RHsXCGkbukoTWkHeCzBHZPspCYGEPPXG'
let bandName;
const queryDiscogs = 'https://api.discogs.com/database/search?artist='+bandName+'&type=release&key='+apiKey+'&secret='+apiSecret;
const search = document.querySelector('#search');
const input = document.querySelector('.input');
const discography = document.querySelector('#discography');


// button click for search artists initiates API fetch
search.addEventListener('click', () => {
        bandName = input.value;
        discography.innerHTML = ''
        discography.textContent = 'Discography';
        getDiscogs();
})

// get album cover images and titles from API
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