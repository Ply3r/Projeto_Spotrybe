import createAsyncSpotTrybe from "./spotify.js";
const MainTitle = document.querySelector('#main-title');

async function getTracks(id, titleName) {
  MainTitle.textContent = titleName;
  const imagemPlayer = document.querySelector('#current-image-player')
  const audio = document.querySelector('#audio');
  const spotTrybe = await createAsyncSpotTrybe();
  const container = document.querySelector('.grid-container')
  let { tracks} = await spotTrybe.getPlaylist(id);
  console.log(tracks);
  tracks.forEach( async ({id, preview_url, artists, album}) => {
    const artistaPrincipal = artists
    .map((artista) => artista.name)
    .join(', ')
    const div = createDiv(id,'grid-item');
    
    const newName = await spotTrybe.getTrackById(id);
    appendToElement(div,[createImage(album.images[0].url),createName(newName.name),createGeneric(artistaPrincipal,'h4')]);
    
    if(preview_url) {
      div.addEventListener('click', () => {
        imagemPlayer.src = album.images[0].url;
        audio.src = preview_url;
      })
    }
    container.append(div)
  });
}

const getPlaylist = async (id, titleName) => {

  const spotTrybe = await createAsyncSpotTrybe();
  const container = document.querySelector('.grid-container')
  let { playlists: { items } } = await spotTrybe.getCategorysPlaylists(id, 20);

  MainTitle.textContent = titleName;

  console.log(items)
  items.forEach(({name, id, images}) => {
    const div = createDiv(id,'grid-item');
    div.addEventListener('click', () => {
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

function cleanContentAndGetPlaylist(id, name) {
  const container = document.querySelector('.grid-container');
  container.innerHTML = '';
  console.log(id);
  getPlaylist(id, name);
}

function cleanContentAndGetTracks(id, name) {
  const container = document.querySelector('.grid-container');
  container.innerHTML = '';
  getTracks(id, name);
}

window.onload = () => {
  getCategories()
}