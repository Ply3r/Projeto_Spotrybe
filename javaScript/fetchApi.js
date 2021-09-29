import createAsyncSpotTrybe from "./spotify.js";


window.onload = async () => {
  // precisa de esperar inicializar 
  const spotTrybe = await createAsyncSpotTrybe();
  console.log(await spotTrybe.getListOfBrowseCategories(5));
}

'https://api.spotify.com/v1/tracks?ids=7ouMYWpwJ422jRcDASZB7P%2C4VqPOruhp5EdPBeR92t6lQ%2C2takcwOaAZWiXQijPHIx7B&market=ES'

'https://api.spotify.com/v1/tracks/7ouMYWpwJ422jRcDASZB7P%2C4VqPOruhp5EdPBeR92t6lQ%2C2takcwOaAZWiXQijPHIx7B&market=BR'