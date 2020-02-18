import {
  register, logIn, createPost, deletePost,
}

  from './app.js';

import { googleLogin } from './googleLogin.js';

/* const btnLogIn = document.getElementById('');
btnLogIn.addEventListener('click', () => {
  const emailR = document.getElementById('emailRegister').value;
  const passwordR = document.getElementById('passwordRegister').value;
  register(emailR, passwordR);
}); */

document.getElementById('enviarRegister').addEventListener('click', register);

document.getElementById('login').addEventListener('click', logIn);

document.getElementById('idGoogle').addEventListener('click', googleLogin);

document.getElementById('btnPost').addEventListener('click', createPost);

document.getElementById('btnDeletePost').addEventListener('click', deletePost);

// llamado de botones
/* export{ emailLog, passLog}
import { register, logIn, googleLogin } from './app.js';

import { createPost } from './posting.js';
import { viewToRegister } from './main';

const btnLogIn = document.getElementById('login');
btnLogIn.addEventListener('click', () => {
 const emailLog = document.getElementById('emailLogIn').value;
 const passLog = document.getElementById('passwordLogIn').value;

logIn(emailLog, passLog);
});

document.getElementById('registerHere').addEventListener('click', viewToRegister);

// document.getElementById('login').addEventListener('click', logIn);


document.getElementById('idGoogle').addEventListener('click', googleLogin);


document.getElementById('btnPost').addEventListener('click', createPost);
export const uid = document.getElementById('uid').value;
export const textPost = document.getElementById('textPost').value;
 */
