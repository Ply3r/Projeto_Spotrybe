import createAsyncSpotTrybe from "./spotify.js";


window.onload = async () => {
  // precisa de esperar inicializar 
  const spotTrybe = await createAsyncSpotTrybe();
  const track = await spotTrybe.getNPossibleTracks('Blinding Lights', 1);
  const trackId = track.tracks.items[0].id;
  await spotTrybe.getTrackById(trackId);
  await spotTrybe.getUserPlaylists('12147540058',5);
  await spotTrybe.getPlaylist('2G73gq2YWPWwToeAwNaD2k');
  await spotTrybe.getListOfBrowseCategories(5);
  await spotTrybe.getListOfNewReleases(5);
  await spotTrybe.getCategorysPlaylists('rock',5);
  await spotTrybe.getListOfFeaturedPlaylists(5);
  await spotTrybe.getUserProfileInfo('12147540058');
}