const CLIENT_ID = '062ce822e4104fa4827a8db0ee93263d';
const CLIENT_SECRET = 'e2e8aa8221984bb9959a7e2ef62de1e1';
const API_TOKEN = 'https://accounts.spotify.com/api/token';


async function getToken() {
  const response = await fetch(API_TOKEN, {
    body: 'grant_type=client_credentials',
    headers: {
      Authorization: 'Basic '+ btoa(`${CLIENT_ID}:${CLIENT_SECRET}`),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method : 'POST',
  })
  if (response.status == 200) {
    let data = await response.json();
    return data.access_token;
  }
}

function makeNewItens(array) {
  const container = document.querySelector('.grid-container')
  container.innerHTML = '';
  array.forEach(({ name, id, artists ,preview_url, album }) => {
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
      const audio = new Audio(preview_url)
      div.addEventListener('click', () => {
        audio.play()
      })
      div.appendChild(audio)
    }
    div.append(imagemContainer)
    div.appendChild(h2)
    div.appendChild(h4)
    container.append(div)
  })
} 

const getSearch = async (query) => {
  const token = await getToken()
  const array = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track&market=US&limit=20&offset=5`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(({ tracks }) => tracks)
    .then(({ items }) => items);
    makeNewItens(array)
  }
  
  function getSearchInput() {
    const search = document.getElementById('search');
    const icon = document.getElementById('icon')
    icon.addEventListener('click', () => {
      const { value } = search
      getSearch(value)
    })
  }

getSearchInput();
