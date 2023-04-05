const apiKey = 'BuTjcTSMjIfxFGWSJNPo'
const apiSecret = 'RHsXCGkbukoTWkHeCzBHZPspCYGEPPXG'
let bandName;
const queryDiscogs = 'https://api.discogs.com/database/search?artist='+bandName+'&type=release&key='+apiKey+'&secret='+apiSecret;
const search = document.querySelector('#search');
const input = document.querySelector('.input');
const discography = document.querySelector('#discography');
const title = document.querySelector('.title');
let bandArr = [];


// button click for search artists -- clears content and initiates API fetch's
search.addEventListener('click', () => {
        bandName = input.value;
        bandArr.push(bandName);
        clearFields();
        getStar();
        getBandTitle();
        getDiscogs();
        getLast();
        getTicket();
        getBands();
        eventSave();
})

// function for clearing fields between new searches
function clearFields() {
    title.innerHTML = '';
    discography.innerHTML = ''
    bioDiv.innerHTML = '';
    tour.innerHTML = '';
    photo.innerHTML = '';
}

// press "enter" to search
input.addEventListener('keydown', function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        search.click();
    }
})

// create title element for body searched
function getBandTitle() {
    const titleEl = document.createElement('h1');
    titleEl.textContent = bandName.toUpperCase();
    titleEl.setAttribute('style', 'font-weight: 700;')
    title.appendChild(titleEl);
}

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


// variables and function to ticketmaster -- for events
const ticketKey = 'UcycjsGfTYWd0RhGEctxiUWtpRjqQXm8'
const ticketSecret = 'HWE3OUWKExknLpdY'
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
                tourEl[i].setAttribute('id', 'tour-date');
                tourEl[i].textContent = tourCity[i] + ', ' + tourState[i] + " | " + tourVenue[i] + " | " + tourDate[i];
                tour.appendChild(tourEl[i]);
                tourEl[i].addEventListener('click', () => {
                    localStorage.setItem(`favorite-event-${bandName + i}`, bandName + ' | ' + tourEl[i].textContent)
                })
            }    
        })
}

// function to get bandsintown API -- band images
const bandsId = 'e1f5697f497a738baf58064c137d1e8b'

function getBands() {
  fetch('https://rest.bandsintown.com/artists/'+bandName+'/?app_id='+bandsId)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);
      let bandImg = data.image_url;
      let bandImgEl = document.createElement('img');
      bandImgEl.setAttribute('src', bandImg);
      photo.appendChild(bandImgEl);
      bandImgEl.classList.add('is-rounded');
    })
}

// variables and open/close functions for discography modal
const discModal = document.querySelector('#disc-modal');
const discBtn = document.querySelector('#disc-modal-btn');
const discCloseBtn = document.querySelector('#disc-close');

discBtn.addEventListener('click', () => {
    discModal.classList.add('is-active');
    console.log('clicked');
})   
discCloseBtn.addEventListener('click', () => {
    discModal.classList.remove('is-active');
})  

// functionality for favorites star
const star = document.querySelector("#star");
const favDrop = document.querySelector('#fav-drop');
const dropDivide = document.querySelector('#drop-divider');
let favBand = [];
let favEvent = [];

star.addEventListener('click', function() {
    if (star.classList.contains('fa-regular')) {
        star.classList.remove('fa-regular');
        star.classList.add('fa-solid');
        for (let i = 0; i < bandArr.length; i++) {
            if (bandName === bandArr[i]) {
                localStorage.setItem(`favorite-band-${bandArr[i]}`, bandArr[i]);
                favBand[i] = document.createElement('a');
                favBand[i].className = 'dropdown-item'
                favBand[i].textContent = bandName.toLowerCase();
                favDrop.appendChild(favBand[i])
            }
        }      
    }else {
        star.classList.remove('fa-solid')
        star.classList.add('fa-regular')
        for (let i = 0; i < localStorage.length; i++) {
            if (bandName === localStorage.getItem(`favorite-band-${bandArr[i]}`)) {
                localStorage.removeItem(`favorite-band-${bandArr[i]}`);
                localBandEl[i].remove();
                favBand[i].remove();
            }
        }
  }
})

function getStar() {
    for (let i = 0; i < bandArr.length; i++) {
        if (localStorage.getItem(`favorite-band-${bandArr[i]}`) === bandName) {
            star.className = 'fa-solid fa-star'
        }else {
            star.className = 'fa-regular fa-star'
        }       
    } 
}

let localBand = [];
let localBandEl = [];

function getFavorite() {
    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i).substring(0,13) == 'favorite-band') {
            localBand[i] = localStorage.getItem(localStorage.key(i))
            localBandEl[i] = document.createElement('a');
            localBandEl[i].textContent = localBand[i]
            localBandEl[i].className = 'dropdown-item';
            favDrop.appendChild(localBandEl[i]);
        }        
    } 
}
getFavorite();