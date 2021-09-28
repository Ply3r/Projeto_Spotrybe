const getToken = async () => {
  const CLIENT_ID = '062ce822e4104fa4827a8db0ee93263d';
  const CLIENT_SECRET = 'e2e8aa8221984bb9959a7e2ef62de1e1';
  const API_TOKEN = 'https://accounts.spotify.com/api/token';
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

function makeNewItens(array, clear) {
  const container = document.querySelector('.grid-container')
  const imagemPlayer = document.querySelector('#current-image-player')
  const audio = document.querySelector('#audio');
  if (clear) {
    container.innerHTML = '';
    limit = 20
  }
  array.forEach(({ name, id, artists, preview_url, album }) => {
    const getFav = localStorage.getItem('favoritos')
    const arrayOfFavs = JSON.parse(getFav);
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
      addLocalStorage(id)
    })
    div.append(imagemContainer)
    div.appendChild(h2)
    div.appendChild(h4)
    div.appendChild(heart)
    container.append(div)
  })
}

const getTracksById = async (array) => {
  const token = await getToken();
  const formatoCorreto = array.join('%2C');
  const res = await fetch(`https://api.spotify.com/v1/tracks?ids=${formatoCorreto}&market=US`, {
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
  }})
    .then((res) => res.json())
    .then(({ tracks }) => tracks)
  makeNewItens(res);
}

const getItemFavoritos = async (array) => {
  const itens = await getTracksById(array)
  console.log(itens)
}

const getFavorites = () => {
  if(localStorage.favoritos) {
    const fav =  localStorage.getItem('favoritos');
    const parseFav = JSON.parse(fav);
    getItemFavoritos(parseFav);
  }
} 

window.onload = () => {
  getFavorites();
}