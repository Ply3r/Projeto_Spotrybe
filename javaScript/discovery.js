import { createAudioElement } from './player.js'

/*
createAudioElement(preview_url);
//audio.src = preview_url;
*/

import createAsyncSpotTrybe from "./spotify.js";
import {addLocalStorage, getCurrentFav} from './localStorageHandler.js'
const MainTitle = document.querySelector('#main-title');
let position = '';
let lastCategory = null; 
let lastPlaylist = null;

const before = document.querySelector('#before');
const after = document.querySelector('#after');


async function getTracks(id, titleName) {
  MainTitle.textContent = titleName;
  
  const arrayOfFavs = getCurrentFav();
  
  const imagemPlayer = document.querySelector('#current-image-player')
  const audio = document.querySelector('#audio');
  const spotTrybe = await createAsyncSpotTrybe();
  const container = document.querySelector('.grid-container')
  let { tracks} = await spotTrybe.getPlaylist(id);
  tracks.forEach( async ({id, preview_url, artists, album}) => {
    const artistaPrincipal = artists
    .map((artista) => artista.name)
    .join(', ')
    const div = createDiv(id,'grid-item');
    
    const newName = await spotTrybe.getTrackById(id);
    
    if(preview_url) {
      div.addEventListener('click', () => {
        imagemPlayer.src = album.images[0].url;
        createAudioElement(preview_url)
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
    appendToElement(div,
      [createImage(album.images[0].url),
      createName(newName.name),
      createGeneric(artistaPrincipal,'h4'),
      heart
    ]);
    container.append(div)
  });
}

const getPlaylist = async (id, titleName) => {
  
  const spotTrybe = await createAsyncSpotTrybe();
  const container = document.querySelector('.grid-container')
  let { playlists: { items } } = await spotTrybe.getCategorysPlaylists(id, 20);
  
  MainTitle.textContent = titleName;
  
  items.forEach(({name, id, images}) => {
    const div = createDiv(id,'grid-item');
    div.addEventListener('click', () => {
      lastPlaylist = [id, name];
      position = 'playlist'
      cleanContentAndGetTracks(id, name);
    })
    appendToElement(div,[createImage(images[0].url),createName(name)]);
    container.append(div)
  });
}

const getCategories = async () => {
  const spotTrybe = await createAsyncSpotTrybe();
  let { categories:{items} } = await spotTrybe.getListOfBrowseCategories(20)
  createAndAppendCategories(items)
}

function createAndAppendCategories(array) {
  const container = document.querySelector('.grid-container')
  array.forEach(({ name, id, icons }) => {
    const { url } = icons[0];
    const div = createDiv(id,'grid-item');
    div.addEventListener('click', () => {
      lastCategory = [id, name];
      position = 'category'
      cleanContentAndGetPlaylist(id, name);
    })
    appendToElement(div,[createImage(url),createName(name)]);
    container.append(div)
  })
}

function createDiv(id, classe) {
  const div = document.createElement('div');
  div.id = id;
  div.className = classe;
  return div
}

function appendToElement(div,listOfElements) {
  listOfElements.forEach((element) => div.append(element));
}

function createImage(url) {
  const image = document.createElement('img');
  image.src = url;
  return image;
}

function createName(name) {
  const h2 = document.createElement('h2')
  h2.innerText = name;
  return h2;
}

function createGeneric(textContent, elementToCreate) {
  const generic = document.createElement(elementToCreate)
  generic.innerText = textContent;
  return generic;
}

function cleanContent() {
  const container = document.querySelector('.grid-container');
  container.innerHTML = '';
}

function cleanContentAndGetPlaylist(id, name) {
  const container = document.querySelector('.grid-container');
  container.innerHTML = '';
  getPlaylist(id, name);
}

function cleanContentAndGetTracks(id, name) {
  const container = document.querySelector('.grid-container');
  container.innerHTML = '';
  getTracks(id, name);
}
before.addEventListener('click',() => {
  if (position === 'playlist' && lastCategory) {
    position = 'category';
    cleanContentAndGetPlaylist(lastCategory[0],lastCategory[1]);
  } else if (position === 'category') {
    position = 'discovery'
    MainTitle.textContent = 'Categorias'
    cleanContent();
    getCategories();
  }
})

after.addEventListener('click',() => {
  if (position === 'discovery' && lastCategory) {
    position = 'category';
    console.log('entrou position category')
    cleanContentAndGetPlaylist(lastCategory[0],lastCategory[1]);
  } else if (position === 'category' && lastPlaylist) {
    position = 'playlist';
    console.log('entrou position playlist')
    cleanContentAndGetTracks(lastPlaylist[0], lastPlaylist[1]);
  }
})

window.onload = () => {
  getCategories()
}