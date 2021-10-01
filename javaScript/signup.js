import createAsyncSpotTrybe from './spotify.js';

const clearMessages = () => {
  const messages = ['.error-msg', '.success-msg'];

  messages.forEach((msg) => {
    const messageElement = document.querySelector(msg);
    if (messageElement) messageElement.remove();
  });
};

const createErrorElement = (msg, elToAppend) => {
  // Remove previous error message
  clearMessages();

  // Add new error message
  const p = document.createElement('p');
  p.innerText = msg;
  p.className = 'mt-2 error-msg';
  p.style.color = 'red';

  elToAppend.appendChild(p);
};

const createSuccessElement = (msg, elToAppend) => {
  // Remove previous success message
  clearMessages();

  // Add new success message
  const p = document.createElement('p');
  p.innerText = msg;
  p.className = 'mt-2 success-msg';
  p.style.color = 'green';

  elToAppend.appendChild(p);
};

const isUser = (username) => {
  const localUser = JSON.parse(localStorage.getItem(username));

  return localUser ? true : false;
};

const createNewAccount = async (username, password, clientId, clientSecret, spotifyId) => {
  const spotTrybe = await createAsyncSpotTrybe();
  let name = username;
  if (spotifyId) name = (await spotTrybe.getUserProfileInfo(spotifyId)).display_name;

  const object = {
    [username]: {
      name,
      username,
      password,
      spotifyId,
      clientId,
      clientSecret,
      playlists: [],
      favorites: [],
    },
  };
  localStorage.setItem(username, JSON.stringify(object[username]));
};

const validateForm = () => {
  const form = document.querySelector('form');

  if (!form.checkValidity()) {
    form.classList.add('was-validated');
    return false;
  }
  else {
    form.classList.remove('was-validated');
    return true;
  }
}

const getFormData = () => {
  if (validateForm()) {
    const fields = ['username', 'password', 'client-id', 'client-secret', 'spotify-id'];
    const fieldsValues = fields.reduce((arr, cur) => [...arr, document.getElementById(cur).value], []);
    return fieldsValues;
  }
  return false;
}

const signUp = (e) => {
  e.preventDefault();

  const formData = getFormData();
  const user = isUser(formData[0]);

  if (formData) {
    const spotifyIdContainer = document.querySelector('.spotify-id-container');

    if (user) {
      createErrorElement('User is already registered!', spotifyIdContainer);
    } else {
      createNewAccount(...formData);
      createSuccessElement('User created successfully!', spotifyIdContainer);
    }
  }
};

const signUpButton = document.querySelector('.signup-btn');
signUpButton.addEventListener('click', signUp);

// Initialize Bootstrap Popovers
const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl);
});
