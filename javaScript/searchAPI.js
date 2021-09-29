import createAsyncSpotTrybe from './spotify.js'
import {addLocalStorage, getCurrentFav} from './localStorageHandler.js'
let limit = 20;
console.log(JSON.parse(localStorage.currentUser));

function makeNewSearch(array, clear) {
  const container = document.querySelector('.grid-container')
  const imagemPlayer = document.querySelector('#current-image-player')
  const audio = document.querySelector('#audio');
  if (clear) {
    container.innerHTML = '';
    limit = 20
  }
  array.forEach(({ name, id, artists, preview_url, album }) => {
    const { images } = album;
    const img = images[0].url
    const artistas = artists
      .map((artista) => artista.name)
      .join(', ')
    const div = createDiv(id, 'grid-item')
    if(preview_url) {
      div.addEventListener('click', () => {
        imagemPlayer.src = img;
        audio.src = preview_url;
      })
    }
    const heart = makeHeart(id);
    appendElements(div, [createImg(img), createText('h2', name), createText('h4', artistas), heart])
    container.append(div)
  })
}

function createImg(src) {
  const img = document.createElement('img');
  img.src = src;
  return img
}

function createText(element, innerText) {
  const containerElement = document.createElement(element)
  containerElement.innerText = innerText;
  return containerElement;
}

function createDiv(id, className) {
  const div = document.createElement('div')
  div.className = className;
  div.id = id;
  return div
}

function makeHeart(id) {
  const arrayOfFavs = getCurrentFav();
  const heart = createDiv('heart', 'far fa-heart');
  if (arrayOfFavs) {
    if( arrayOfFavs.includes(id) ) {
      heart.className = 'fas fa-heart'
    }
  }
  heart.addEventListener('click', () => {
    if(heart.classList.contains('fas')) {
      heart.className = 'far fa-heart'
    } else {
      heart.className = 'fas fa-heart'
    }
    addLocalStorage(id)
  })
  return heart
}

function appendElements(parent, elements) {
  elements.forEach((element) => parent.appendChild(element))
}

const getSearch = async (query, limite, slice = 0) => {
  if (slice > 50) return;
  const spotTrybe = await createAsyncSpotTrybe();
  let canSearch = true
  let array = await spotTrybe.getNPossibleTracks(query, limite)
    .then(({ tracks }) => tracks)
    .then(({ items }) => items)
    .catch(() => canSearch = false);
  if(canSearch) {
    array = array.slice(slice)
    slice ? makeNewSearch(array) : makeNewSearch(array, true)
  }
}

function makeTop50(array) {
  const container = document.querySelector('.grid-container')
  container.innerHTML = '';
  const imagemPlayer = document.querySelector('#current-image-player')
  const audio = document.querySelector('#audio');
  array.forEach(({ id, artists, preview_url, album: { name, images } }) => {
    const artistas = artists
      .map((artista) => artista.name)
      .join(', ')
    const img = images[1].url
    const div = createDiv(id, 'grid-item')
    if(preview_url) {
      div.addEventListener('click', () => {
        imagemPlayer.src = img;
        audio.src = preview_url;
      })
    }
    const heart = makeHeart(id);
    appendElements(div, [createImg(img), createText('h2', name), createText('h4', artistas), heart])
    container.append(div)
  })
}

const getTop50 = async () => {
  const spotTrybe = await createAsyncSpotTrybe();
  const array = await spotTrybe.getPlaylist('37i9dQZEVXbMDoHDwVN2tF')
    .then(({tracks}) => tracks)
  makeTop50(array)
}
  
function getSearchInput() {
  const search = document.getElementById('search');
  search.addEventListener('keyup', () => {
    const { value } = search
    if (!value) {
      getTop50();
    } else {
      getSearch(value, 20);
    }
  })
}
getSearchInput();

function verifyScroll() {
  const container = document.querySelector('.grid-container')
  container.addEventListener('scroll', () => {
    const isTheEnd = (container.scrollHeight - container.scrollTop) === 569;
    if(isTheEnd) {
      const { value } = document.getElementById('search');
      limit += 20
      getSearch(value, limit, limit - 20)
    }
  })
}
verifyScroll();

window.onload = () => {
  getTop50();
}

export { getCurrentFav, addLocalStorage };
