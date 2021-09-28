const CreateErrorElement = (msg) => {
  let p = document.createElement('p');
  p.innerText = msg;
  p.className = 'mt-2 error-msg'
  p.style.color = 'red';

  return p;
};

const isUser = (username, password) => {
    const localUsers = JSON.parse(localStorage.getItem('users'));

    return localUsers ? localUsers.find(([localUser, localPassword]) => localUser === username && localPassword === password) : null;
}

const signIn = (evt) => {
  evt.preventDefault();

  const username = document.getElementById('username');
  const password = document.getElementById('password');

  const user = isUser(username, password);

  if (user) {
    localStorage.setItem('currentUser', user);
    // Mudar para home aqui
  } else {

    if (!document.getElementsByClassName('error-msg')[0]) {
        const passwordContainer = document.getElementsByClassName('password-container')[0];
        passwordContainer.appendChild(CreateErrorElement('Usuário não encontrado!'));
    }
  }
};

signInButton = document.getElementsByClassName('login-btn')[0];

signInButton.addEventListener('click', signIn);
