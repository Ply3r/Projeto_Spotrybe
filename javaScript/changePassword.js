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

  return localUser ? localUser : false;
};

const changePassword = (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const user = isUser(username);
  const passwordContainer = document.getElementsByClassName('password-container')[0];

  if (user) {
    localStorage.setItem(username, JSON.stringify({ ...user, password }));
    createSuccessElement('Password is changed!', passwordContainer);
  } else {
    createErrorElement('There is no user with this username!', passwordContainer);
  }
};

const changePwdButton = document.querySelector('.change-pwd-btn');
changePwdButton.addEventListener('click', changePassword);
