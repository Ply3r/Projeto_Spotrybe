const currentUser = localStorage.getItem('currentUser');

if (currentUser) window.location.href = './discovery.html';
else window.location.href = './login.html';