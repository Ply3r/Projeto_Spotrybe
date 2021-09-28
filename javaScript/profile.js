import createAsyncSpotTrybe from "./spotify.js";

// dentro da funcao async
async function getProfileDice(){
  const spotTrybe = await createAsyncSpotTrybe();
  let {display_name, images, followers} = await spotTrybe.getUserProfileInfo('12147540058');  

  changeProfile(display_name, images[0], followers.total);

}

function changeProfile(name, url, followers) {

  document.querySelector('.followers').innerText = followers
  document.querySelector('.image-profile').src = url.url;
  document.querySelector('.name-profile').innerText = name;
}

window.onload = () => getProfileDice();