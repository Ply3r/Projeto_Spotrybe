import createAsyncSpotTrybe from "./spotify.js"

const CreateErrorElement = (msg, elToAppend) => {
  let p = document.createElement('p');
  p.innerText = msg;
  p.className = 'mt-2 error-msg';
  p.style.color = 'red';

  elToAppend.appendChild(p);
};

const createSuccessElement = (msg, elToAppend) => {
  let p = document.createElement('p');
  p.innerText = msg;
  p.className = 'mt-2 success-msg';
  p.style.color = 'green';

  elToAppend.appendChild(p);
};

const isUser = (username, password) => {
  const localUsers = JSON.parse(localStorage.getItem('users'));

  if (localUsers) {
    if (localUsers[username] && localUsers[username].password === password) return localUsers[username];
  }
  return false;
};

const signUp = (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const user = isUser(username, password);
  const spotifyIdContainer = document.getElementsByClassName('spotify-id-container')[0];

  if (user) {
    CreateErrorElement('User is already registered!', spotifyIdContainer);
  } else {
    localStorage.setItem('users', JSON.stringify({
      ...JSON.parse(localStorage.getItem('users')),
      [username]: {
        password,
      },
    }));

    createSuccessElement('User created successfully!', spotifyIdContainer);
    // Mudar para home aqui
  }
};

const signUpButton = document.getElementsByClassName('signup-btn')[0];

signUpButton.addEventListener('click', signUp);

async function createNewAccount() {
  const spotTrybe = await createAsyncSpotTrybe();
  const user = document.querySelector('#username').value;
  const pass = document.querySelector('#password').value;
 // const spotifyId = document.querySelector('#spotify-id').value;
  const userRetrieved = await spotTrybe.getUserProfileInfo('12147540058');
  console.log(userRetrieved)

  const objeto ={ 
    [user]:{
      name: userRetrieved.display_name,
      password: pass,
      spotifyId: '',
      playlists: []
    }
  }

}
createNewAccount();
