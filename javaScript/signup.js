const CreateErrorElement = (msg, elToAppend) => {
  let p = document.createElement('p');
  p.innerText = msg;
  p.className = 'mt-2 error-msg';
  p.style.color = 'red';

  elToAppend.appendChild(p);
};

const isUser = (username, password) => {
  const localUsers = JSON.parse(localStorage.getItem('users'));

  return localUsers
    ? localUsers.find(
        ([localUser, localPassword]) => localUser === username && localPassword === password
      )
    : null;
};

const signUp = (e) => {
  e.preventDefault();

  const username = document.getElementById('username');
  const password = document.getElementById('password');

  const user = isUser(username, password);

  if (user) {
      
  }
};
