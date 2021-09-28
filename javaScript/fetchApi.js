import createAsyncSpotTrybe from "./spotify.js";


window.onload = async () => {
  // precisa de esperar inicializar 
  const spotTrybe = await createAsyncSpotTrybe();
  const track = await spotTrybe.getNPossibleTracks('Blinding Lights', 1);
  const trackId = track.tracks.items[0].id;
  await spotTrybe.getTrackById(trackId);
  await spotTrybe.getUserPlaylists('12147540058',5);
  console.log('playlist')
  console.log(await spotTrybe.getPlaylist('2G73gq2YWPWwToeAwNaD2k'))
  console.log('fim playlist')
  await spotTrybe.getListOfBrowseCategories(5);
  await spotTrybe.getListOfNewReleases(5);
  await spotTrybe.getCategorysPlaylists('rock',5);
  console.log('aaaa');
  await spotTrybe.getListOfFeaturedPlaylists(1);
  await spotTrybe.getUserProfileInfo('12147540058');
  console.log('tracks');
  await spotTrybe.getSeveralTracksById('7ouMYWpwJ422jRcDASZB7P,4VqPOruhp5EdPBeR92t6lQ,2takcwOaAZWiXQijPHIx7B')
}

'https://api.spotify.com/v1/tracks?ids=7ouMYWpwJ422jRcDASZB7P%2C4VqPOruhp5EdPBeR92t6lQ%2C2takcwOaAZWiXQijPHIx7B&market=ES'

'https://api.spotify.com/v1/tracks/7ouMYWpwJ422jRcDASZB7P%2C4VqPOruhp5EdPBeR92t6lQ%2C2takcwOaAZWiXQijPHIx7B&market=BR'