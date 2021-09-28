import createAsyncSpotTrybe from "./spotify.js";
let limit = 20;

function makeNewItens(array) {
  limit = 20
  const container = document.querySelector('.grid-container')
  const imagemPlayer = document.querySelector('#current-image-player')
  const audio = document.querySelector('#audio');
  container.innerHTML = '';
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
    slice ? getMoreItens(array) : makeNewItens(array)
  }
}
  
function getSearchInput() {
  const search = document.getElementById('search');
  search.addEventListener('keyup', () => {
    const { value } = search
    getSearch(value, 20)
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