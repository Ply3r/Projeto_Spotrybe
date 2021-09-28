import Spotify from "./spotify.js";


window.onload = async () => {
  const spotify = new Spotify();
  
  const track = await spotify.getNPossibleTracks('Blinding Lights', 1);
  const trackId = track.tracks.items[0].id;
  spotify.getTrack(trackId);
  
}