import Spotify from "./spotify.js";


window.onload = async () => {
  const spotify = new Spotify();
  
<<<<<<< HEAD:javaScript/fetchApi.js
  Spotify.getNPossibleTracks('Blinding Lights', 10, token);
=======
  const track = await spotify.getNPossibleTracks('Blinding Lights', 1);
  const trackId = track.tracks.items[0].id;
  spotify.getTrack(trackId);
>>>>>>> f2e9a70dc5d071c8cdced5d4851d84cf80a0fa58:fetchApi.js
  
}