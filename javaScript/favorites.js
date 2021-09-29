import {addLocalStorage, getCurrentFav} from './localStorageHandler.js'
import createAsyncSpotTrybe from './spotify.js';


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
      addLocalStorage(id);
      getItemFavoritos();
    })
    div.append(imagemContainer)
    div.appendChild(h2)
    div.appendChild(h4)
    div.appendChild(heart)
    container.append(div)
  })
}

const getItemFavoritos = async (array) => {
  document.querySelector('.grid-container').innerHTML = '';
  const favs = getCurrentFav();
  const spotTrybe = await createAsyncSpotTrybe();
  const itens = await spotTrybe.getSeveralTracksById(favs.toString())
  makeNewItens(itens.tracks);
}

window.onload = () => {
  getItemFavoritos();
}