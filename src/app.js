// funcionalidad solo exporta funciones

// verify email user
function verified() {
  const user = firebase.auth().currentUser;
  user.sendEmailVerification().then(() => {
    alert('Revisa tu correo para que puedas ingresar satisfactoriamente');
  }).catch(() => {
    alert('correo de verificación no enviado');
  });
}

// function Sign Out
function closingSesion() {
  firebase.auth().signOut()
    .then(() => {
      alert('cerrando sesion...');
    })
    .catch(() => {
      console.log(error);
    });
}

// Register a new user
export function register() {
  const emailR = document.getElementById('emailRegister').value;
  const passwordR = document.getElementById('passwordRegister').value;
  firebase.auth().createUserWithEmailAndPassword(emailR, passwordR)
    .then(() => {
      verified();
    })
    .catch(() => {
      alert('el correo o la contraseña no es valida( la contraseña debe tener 6 caracteres o más)');
    });
}

// Login with an user and password
export function logIn() {
  const emailLog = document.getElementById('emailLogIn').value;
  const passLog = document.getElementById('passwordLogIn').value;
  firebase.auth().signInWithEmailAndPassword(emailLog, passLog)
    .then(() => {
      alert('Iniciaste sesion exitosamente!');
      showContent();
    })
    .catch(() => {
      alert('revisa tu nombre de usuario y/o contraseña');
      document.getElementById('logState').innerHTML = 'No existe ususario(a) activo(a)';
    });
}
//  if login permit close session
function showContent() {
  const showing = document.getElementById('contenido');
  showing.innerHTML = `
  <p> Bienvenido(a)! </p> 
  <button id="closing"> Cerrar Sesion </button>
  `;
  document.getElementById('closing').addEventListener('click', closingSesion);
}

// Observer state
export function stateObserved() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      showContent();
      console.log('existe usuario activo');
      // user is sign in Sketch
      const displayName = user.displayName;
      console.log(displayName);
      const email = user.email;
      console.log(email);
      const emailVerified = user.emailVerified;
      console.log(emailVerified);
      const photoURL = user.photoURL;
      console.log(photoURL);
      const isAnonymous = user.isAnonymous;
      console.log(isAnonymous);
      const uid = user.uid;
      console.log(uid);
      const providerData = user.providerData;
      console.log(providerData);
      if (emailVerified) {
      // trae a la nueva pagina
      } else {
        // closingSesion()
      }
    }
  });
}

stateObserved();
