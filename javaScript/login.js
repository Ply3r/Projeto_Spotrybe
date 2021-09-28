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
  const submitButton = document.getElementById('submit');
  submitButton.addEventListener('click', () => {
    if (localUsers) {
      if (localUsers[username].userID === username && localUsers[username].password === password) {
        window.location.href = "../pages/search.html"
      };
    }
  })
};
isUser();

const signIn = (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const user = isUser(username, password);
  const passwordContainer = document.getElementsByClassName('password-container')[0];

  if (user) {
    localStorage.setItem('currentUser', user);
    createSuccessElement('Logged in successfully!', passwordContainer);

    // Mudar para home aqui
  } else {
    if (!document.getElementsByClassName('error-msg')[0]) {
      CreateErrorElement('User not found!', passwordContainer);
    }
  }
};

const signInButton = document.getElementsByClassName('login-btn')[0];

signInButton.addEventListener('click', signIn);
