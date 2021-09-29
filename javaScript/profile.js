import createAsyncSpotTrybe from "./spotify.js";

// dentro da funcao async
async function getProfileDice(){

  const spotTrybe = await createAsyncSpotTrybe();

  const user = JSON.parse(localStorage.getItem('currentUser'));

  let {
    display_name, 
    images, followers, 
    external_urls, 
  } = await spotTrybe.getUserProfileInfo(user.spotifyId);  

  changeProfile(display_name, images[0], followers.total, external_urls.spotify);

}

function changeProfile(name, url, followers, spotifyLink) {

  document.querySelector('.followers').innerText = followers
  document.querySelector('.image-profile').src = url.url;
  document.querySelector('.name-profile').innerText = name;
  document.querySelector('.profile-spotify').href = spotifyLink;
}



async function userPlaylist() {
  const spotTrybe = await createAsyncSpotTrybe();

  const user = JSON.parse(localStorage.getItem('currentUser'));
  
  const { items } = await spotTrybe.getUserPlaylists(user.spotifyId, 9);

  items.forEach(item => {
    createCardPlaylist(item);
  });
}

function createCardPlaylist({name, images}){

  const div = document.createElement('div');
  const img = document.createElement('img');
  const paragraph = document.createElement('p');

  img.src = images[0].url;
  img.className += 'img-card-playlist';
  paragraph.innerText = name;

  div.appendChild(img)
  div.appendChild(paragraph)

  document.querySelector('.cards-group').appendChild(div);
}


window.onload = () =>{
  getProfileDice();
  userPlaylist();
};