

function addLocalStorage(id) {
  if(localStorage.currentUser) {
    const usuarioJSON = localStorage.getItem('currentUser');
    const usuario = JSON.parse(usuarioJSON)
    console.log(usuario);
    if (usuario.favorites.includes(id) && usuario.favorites) {
      const arrFiltrado = usuario.favorites.filter((item) => item !== id)
      usuario.favorites = arrFiltrado
    } else {
      usuario.favorites.push(id);
    }
    console.log('aaaaaa')
    localStorage.setItem('currentUser', JSON.stringify(usuario));
    localStorage.setItem(usuario.username, JSON.stringify(usuario));
  }
}

function getCurrentFav() {
  const usuarioJSON = localStorage.getItem('currentUser');
  const usuario = JSON.parse(usuarioJSON)
  return usuario.favorites
}

export {addLocalStorage, getCurrentFav}