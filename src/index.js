// llamado de botones

import { register, logIn }

  from './app.js';

import { googleLogin } from './googleLogin.js';

document.getElementById('btnregister').addEventListener('click', register);

document.getElementById('login').addEventListener('click', logIn);

document.getElementById('idGoogle').addEventListener('click', googleLogin);
