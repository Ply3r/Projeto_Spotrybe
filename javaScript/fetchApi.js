import createAsyncSpotTrybe from "./spotify.js";


window.onload = async () => {
  // precisa de esperar inicializar 
  const spotTrybe = await createAsyncSpotTrybe();
  const track = await spotTrybe.getNPossibleTracks('Blinding Lights', 1);
  const trackId = track.tracks.items[0].id;
  spotTrybe.getTrackById(trackId);
  spotTrybe.getUserPlaylists('12147540058',5);
  spotTrybe.getPlaylist('2G73gq2YWPWwToeAwNaD2k');
  spotTrybe.getListOfBrowseCategories(5);
  spotTrybe.getListOfNewReleases(5);
  spotTrybe.getCategorysPlaylists('rock',5);
  spotTrybe.getListOfFeaturedPlaylists(5);
}