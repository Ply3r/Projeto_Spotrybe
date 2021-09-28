import createAsyncSpotTrybe from './spotify.js';

const CreateErrorElement = (msg, elToAppend) => {
  // Remove previous error message

  const prevErrMessage = document.querySelector('.error-msg');
  if (prevErrMessage) prevErrMessage.remove();

  // Add new error message

  let p = document.createElement('p');
  p.innerText = msg;
  p.className = 'mt-2 error-msg';
  p.style.color = 'red';

  elToAppend.appendChild(p);
};

const createSuccessElement = (msg, elToAppend) => {
  // Remove previous success message

  const prevSuccessMessage = document.querySelector('.error-msg');
  if (prevSuccessMessage) prevSuccessMessage.remove();

  // Add new success message

  let p = document.createElement('p');
  p.innerText = msg;
  p.className = 'mt-2 success-msg';
  p.style.color = 'green';

  elToAppend.appendChild(p);
};

const isUser = (username) => {
  const localUser = JSON.parse(localStorage.getItem(username));

  return localUser ? true : false;
};

const createNewAccount = async (username, password, spotifyId) => {
  const spotTrybe = await createAsyncSpotTrybe();
  let name = username;
  if (spotifyId) name = (await spotTrybe.getUserProfileInfo(spotifyId)).display_name;

  const objeto = {
    [username]: {
      name,
      password,
      spotifyId,
      playlists: [],
      favorites: [],
    },
  };
  localStorage.setItem(username, JSON.stringify(objeto[username]));
  localStorage.setItem('currentUser', JSON.stringify(objeto[username]));
};

const signUp = (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const spotifyId = document.getElementById('spotify-id').value;

  const user = isUser(username);
  const spotifyIdContainer = document.getElementsByClassName('spotify-id-container')[0];

  if (user) {
    CreateErrorElement('User is already registered!', spotifyIdContainer);
  } else {
    // Create Account
    createNewAccount(username, password, spotifyId);
    createSuccessElement('User created successfully!', spotifyIdContainer);
  }
};

const signUpButton = document.querySelector('.signup-btn');
signUpButton.addEventListener('click', signUp);
