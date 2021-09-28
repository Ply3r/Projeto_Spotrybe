import createAsyncSpotTrybe from "./spotify.js";

function makeNewItens(array) {
  const container = document.querySelector('.grid-container')
  const imagemPlayer = document.querySelector('#current-image-player')
  const audio = document.querySelector('#audio');
  container.innerHTML = '';
  array.forEach(({ name, id, artists, preview_url, album }) => {
    const artistaPrincipal = artists[0].name
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
    div.append(imagemContainer)
    div.appendChild(h2)
    div.appendChild(h4)
    container.append(div)
  })
}

function getMoreItens(array) {
  const container = document.querySelector('.grid-container')
  const imagemPlayer = document.querySelector('#current-image-player')
  const audio = document.querySelector('#audio');
  array.forEach(({ name, id, artists, preview_url, album }) => {
    const artistaPrincipal = artists[0].name
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
    div.append(imagemContainer)
    div.appendChild(h2)
    div.appendChild(h4)
    container.append(div)
  })
}



const getSearch = async (query, limite) => {
  const spotTrybe = await createAsyncSpotTrybe();
  const array = await spotTrybe.getNPossibleTracks(query, limite)
    .then(({ tracks }) => tracks)
    .then(({ items }) => items);
  makeNewItens(array)
}
  
function getSearchInput() {
  const search = document.getElementById('search');
  search.addEventListener('keyup', () => {
    const { value } = search
    getSearch(value, 20)
  })
}

getSearchInput();
