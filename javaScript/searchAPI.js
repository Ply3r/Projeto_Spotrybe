import createAsyncSpotTrybe from './spotify.js'
import { createAudioElement } from './player.js';
import {addLocalStorage, getCurrentFav} from './localStorageHandler.js'
console.log(JSON.parse(localStorage.currentUser));

function makeNewSearch(array, clear) {
  const type = document.querySelector('.bot-active')
  const container = document.querySelector('#main-container')
  type.id === 'grid' ? container.className = 'grid-container' : container.className = 'flex-container'
  if (clear) {
    container.innerHTML = '';
  }
  const imagemPlayer = document.querySelector('#current-image-player')
  array.forEach(({ name, id, artists, preview_url, album }, index) => {
    const { images } = album;
    const img = images[0].url
    const artistas = artists
      .map((artista) => artista.name)
      .join(', ')
    let div;
    if (type.id === 'grid') {
      div = createDiv(id, 'grid-item')
    } else {
      div = createDiv(id, 'flex-item')
      const p = createText('p', index + 1)
      p.id = `index-${index + 1}`
      div.appendChild(p)
    }
    if(preview_url) {
      div.addEventListener('click', () => {
        imagemPlayer.src = img;
        imagemPlayer.style.visibility = 'visible'
        createAudioElement(preview_url)
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
  const type = document.querySelector('.bot-active')
  const container = document.querySelector('#main-container')
  type.id === 'grid' ? container.className = 'grid-container' : container.className = 'flex-container'
  container.innerHTML = '';
  const imagemPlayer = document.querySelector('#current-image-player')
  array.forEach(({ id, artists, preview_url, album: { name, images } }, index) => {
    const artistas = artists
      .map((artista) => artista.name)
      .join(', ')
    const img = images[1].url
    let div;
    if (type.id === 'grid') {
      div = createDiv(id, 'grid-item')
    } else {
      div = createDiv(id, 'flex-item')
      div.appendChild(createText('p', index + 1))
    }
    if(preview_url) {
      div.addEventListener('click', () => {
        imagemPlayer.src = img;
        imagemPlayer.style.visibility = 'visible'
        createAudioElement(preview_url);
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
      getSearch(value, 50);
    }
  })
}
getSearchInput();

function changeGrid() {
  const botContainer = document.querySelector('.bot-container')
  botContainer.addEventListener('click', ({target}) => {
    const container = document.querySelector('#main-container');
    target = target.closest('.btn')
    if (!target.classList.contains('bot-active')) {
      const childs = botContainer.children
      for (let c = 0; c < childs.length; c += 1) {
        childs[c].className = 'btn btn-secondary';
      }
      target.className += ' bot-active'
      container.className = `${target.id}-container`;
      const containerItens = container.children;
      for (let c = 0; c < containerItens.length; c += 1) {
        if(target.id === 'flex') {
          const p = createText('p', c + 1);
          p.id = `index-${c + 1}`
          containerItens[c].insertBefore(p, containerItens[c].firstChild)
        } else {
          const p = document.querySelector(`#index-${c + 1}`).remove()
        }
        containerItens[c].className = `${target.id}-item`
      }
    }
  })
}
changeGrid();

window.onload = () => {
  getTop50();
}
