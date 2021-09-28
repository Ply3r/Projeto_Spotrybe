import createAsyncSpotTrybe from "./spotify.js";


window.onload = async () => {
  // precisa de esperar inicializar 
  const spotTrybe = await createAsyncSpotTrybe();
  const track = await spotTrybe.getNPossibleTracks('Blinding Lights', 1);
  const trackId = track.tracks.items[0].id;
  spotTrybe.getTrack(trackId);
  
  spotTrybe.getPlaylist('2G73gq2YWPWwToeAwNaD2k');
}