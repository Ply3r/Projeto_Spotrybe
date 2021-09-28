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
  console.log(response);
  if (response.status == 200) {
    let data = await response.json();
    console.log(data);
    return data.access_token;
  }
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
  
}

getSearch()

function getSearchInput() {
  const search = document.querySelector('#search');
  search.addEventListener('keyup', (event) => {
    const { value } = event.target;
    if(event.which === 13) {
      getSearchInput(value)
    }
  })
}
getSearchInput();
