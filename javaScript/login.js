const clearMessages = () => {
  const messages = ['.error-msg', '.success-msg'];

  messages.forEach((msg) => {
    const messageElement = document.querySelector(msg);
    if (messageElement) messageElement.remove();
  });
};

const CreateErrorElement = (msg, elToAppend) => {
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
  const user = JSON.parse(localStorage.getItem(username));

  return user ? user : false;
};

const signIn = (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const user = isUser(username);
  const passwordContainer = document.getElementsByClassName('password-container')[0];

  if (user) {
    if (password === user.password) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        createSuccessElement('Logged in successfully!', passwordContainer);
        window.location.href = '../pages/search.html';
    } else {
        CreateErrorElement('Password is not correct!', passwordContainer);
    }
  } else {
    CreateErrorElement('User not found!', passwordContainer);
  }
};

const signInButton = document.querySelector('.login-btn');
const signUpButton = document.querySelector('.signup-btn');

signInButton.addEventListener('click', signIn);
signUpButton.addEventListener('click', (e) => {
  e.preventDefault();
  window.location.href = './signup.html';
});
