class Spotify {
  token = '';
  
  constructor() {
    this.token = Spotify.getToken();
  }

  async init() {
    this.token = await this.token;
  }

  static async getToken() {
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
      this.token = data.access_token;
      return data.access_token;
    }
  }
  
  async getPlaylist(id) {
    const response = await fetch(`https://api.spotify.com/v1/playlists/${id}?market=BR&fields=followers(total),id,images,name,owner(display_name),tracks(items)`, 
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json"
      }
    })
    const data = await response.json();
  }

  async getListOfBrowseCategories(numberOfCategories) {
    const result = await fetch(`https://api.spotify.com/v1/browse/categories?country=BR&limit=${numberOfCategories}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json"
      }
    })
    const data = await result.json();
    return data;
  }

  async getUserPlaylists(userId, numberOfPlaylists) {
    const result = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists?limit=${numberOfPlaylists}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json"
      }
    })
    const data = await result.json();
    return data;
  }

  async getTrackById(id) {
    const result = await fetch(`https://api.spotify.com/v1/tracks/${id}?market=BR`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json"
      }
    })
    const data = await result.json();
    return data;
  }

  async getNPossibleTracks(name = '', possibleTracks) {
    const formatedName = name.replaceAll(' ', '%20');
    const response = await fetch(`https://api.spotify.com/v1/search?q=${formatedName}&type=track&market=BR&market=US&limit=${possibleTracks}`, 
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json"
      }
    })
    const data = await response.json();
    return data;
  }

}

const spotTrybe = new Spotify();

async function createAsyncSpotTrybe() {
  await spotTrybe.init();
  return spotTrybe;
}

export default createAsyncSpotTrybe;
