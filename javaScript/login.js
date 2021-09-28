const CreateErrorElement = (msg, elToAppend) => {
    // Remove previous error message
  
    const prevErrMessage = document.querySelector('.error-msg');
    console.log(prevErrMessage);
    if (prevErrMessage) prevErrMessage.remove();
    else {
      // Add new error message
  
      let p = document.createElement('p');
      p.innerText = msg;
      p.className = 'mt-2 error-msg';
      p.style.color = 'red';
  
      elToAppend.appendChild(p);
    }
  };
  
  const createSuccessElement = (msg, elToAppend) => {
    // Remove previous success message
  
    const prevSuccessMessage = document.querySelector('.error-msg');
  
    if (prevSuccessMessage) prevSuccessMessage.remove();
    else {
      // Add new success message
  
      let p = document.createElement('p');
      p.innerText = msg;
      p.className = 'mt-2 success-msg';
      p.style.color = 'green';
    
      elToAppend.appendChild(p);
    }
  };

const isUser = (username, password) => {
  const user = JSON.parse(localStorage.getItem(username));

  return user && user.password === password ? user : false;
};

const signIn = (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const user = isUser(username, password);
  const passwordContainer = document.getElementsByClassName('password-container')[0];

  if (user) {
    localStorage.setItem('currentUser', user);
    createSuccessElement('Logged in successfully!', passwordContainer);

    window.location.href = '../pages/search.html';
  } else {
      CreateErrorElement('User not found!', passwordContainer);
  }
};

const signInButton = document.getElementsByClassName('login-btn')[0];

signInButton.addEventListener('click', signIn);
