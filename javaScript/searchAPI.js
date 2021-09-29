import createAsyncSpotTrybe from './spotify.js'
import {addLocalStorage, getCurrentFav} from './localStorageHandler.js'
let limit = 20;
console.log(JSON.parse(localStorage.currentUser));

function makeNewItens(array, clear) {
  const container = document.querySelector('.grid-container')
  const imagemPlayer = document.querySelector('#current-image-player')
  const audio = document.querySelector('#audio');
  if (clear) {
    container.innerHTML = '';
    limit = 20
  }
  const arrayOfFavs = getCurrentFav();
  array.forEach(({ name, id, artists, preview_url, album }) => {
    const artistaPrincipal = artists
      .map((artista) => artista.name)
      .join(', ')
    const { images } = album;
    const img = images[0].url
    const imagemContainer = document.createElement('img')
    imagemContainer.src = img;
    const h2 = document.createElement('h2')
    h2.innerText = name;
    const h4 = document.createElement('h4')
    h4.innerText = artistaPrincipal;
    const div = document.createElement('div')
    div.className = 'grid-item'
    div.id = id;
    if(preview_url) {
      div.addEventListener('click', () => {
        imagemPlayer.src = img;
        audio.src = preview_url;

        imagemPlayer.style.visibility = 'visible'
      })
    }
    const heart = document.createElement('div');
    heart.className = 'far fa-heart'
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
    div.append(imagemContainer)
    div.appendChild(h2)
    div.appendChild(h4)
    div.appendChild(heart)
    container.append(div)
  })
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
    slice ? makeNewItens(array) : makeNewItens(array, true)
  }
}

const getTrending = async () => {
  const spotTrybe = await createAsyncSpotTrybe();
  let array = await spotTrybe.getPlaylist('2G73gq2YWPWwToeAwNaD2k')
    .then(({ tracks }) => tracks)
    .then(({ items }) => items)
    .then((arr) => arr.map((item) => item.track))
  makeNewItens(array, true)
}
  
function getSearchInput() {
  const search = document.getElementById('search');
  search.addEventListener('keyup', () => {
    const { value } = search
    if (value !== '') {
      getSearch(value, 20)
    } else {
      getTrending()
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
export { getCurrentFav, addLocalStorage };