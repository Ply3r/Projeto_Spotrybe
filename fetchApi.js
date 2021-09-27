import Spotify from "./spotify.js";

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

window.onload = async () => {
  const token = await getToken();
  
  Spotify.getNPossibleTracks('Blinding Lights', 3, token);
  
}