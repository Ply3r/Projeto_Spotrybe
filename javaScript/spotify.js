class Spotify {
  token = '';
  
  constructor() {
  }

  async init() {
    this.token = await Spotify.getToken();
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
    console.log('Starting to FetchPlaylist')
    console.time('Playlist fetched');

    const response = await fetch(`https://api.spotify.com/v1/playlists/${id}?market=BR&fields=followers(total),id,images,name,owner(display_name),tracks(items)`, 
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json"
      }
    })
    
    const data = await response.json();
    console.log(data);
    const dados = {
      name: data.name,
      tracks: data.tracks.items.reduce((acc,item) => {
        const objeto = {
          id: item.track.id,
          preview_url: item.track.preview_url,
          artists: item.track.artists,
          album: item.track.album,
        }
        return [...acc, objeto]
      }, [])
    }

    return dados;
  }

  async getListOfBrowseCategories(numberOfCategories) {
    console.log('Fetching list of Brower Categories');
    console.time('Categories fetched')

    const result = await fetch(`https://api.spotify.com/v1/browse/categories?country=BR&limit=${numberOfCategories}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json"
      }
    })
    const data = await result.json();
    console.log(data);

    console.timeEnd('Categories fetched')
    return data;
  }

  async getCategorysPlaylists(categoryName, numberOfCategories) {
    console.log('Fetching Playlist from ', categoryName);
    console.time('getCategorysPlaylists done')

    const result = await fetch(`https://api.spotify.com/v1/browse/categories/${categoryName}/playlists?country=BR&limit=${numberOfCategories}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json"
      }
    })
    console.log(result);
    const data = await result.json();
    console.log(data);

    console.timeEnd('getCategorysPlaylists done')
    return data;
  }

  async getListOfNewReleases(numberOfNewReleases) {
    console.log('Fetching List of new releases from ');
    console.time('getListOfNewReleases done')

    const result = await fetch(`https://api.spotify.com/v1/browse/new-releases?country=BR&limit=${numberOfNewReleases}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json"
      }
    })
    console.log(result);
    const data = await result.json();
    console.log(data);

    console.timeEnd('getListOfNewReleases done')
    return data;
  }

  async getListOfFeaturedPlaylists(numberOfNewReleases) {
    console.log('Fetching List of Featured Playlists from ');
    console.time('getListOfFeaturedPlaylists done')

    const result = await fetch(`https://api.spotify.com/v1/browse/featured-playlists?country=BR&limit=${numberOfNewReleases}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json"
      }
    })
    console.log(result);
    const data = await result.json();
    console.log(data);

    console.timeEnd('getListOfFeaturedPlaylists done')
    return data;
  }


  async getUserProfileInfo(userId) {
    try {
      const result = await fetch(`https://api.spotify.com/v1/users/${userId}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json"
        }
      })
      console.log(result);
      const data = await result.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log('userName invalido');
      return null;
    }
  }

  async getArtistsInfo(artistId) {
    const result = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json"
      }
    })
    console.log(result);
    const data = await result.json();
    console.log(data);
    return data;
  }

  async getArtistSongs(artistId) {
    const result = await fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json"
      }
    })
    console.log(result);
    const data = await result.json();
    console.log(data);
    return data;
  }

  async getArtistSongs(artistId) {
    const result = await fetch(`https://api.spotify.com/v1/artists/${artistId}/top-tracks`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json"
      }
    })
    console.log(result);
    const data = await result.json();
    console.log(data);
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
