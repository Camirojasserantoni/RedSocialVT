// funcionalidad solo exporta funciones

// Register a new user

export function register() {
  const emailR = document.getElementById('emailRegister').value;
  const passwordR = document.getElementById('passwordRegister').value;
  firebase.auth().createUserWithEmailAndPassword(emailR, passwordR)
    .then(() => {
      verified()
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
}

// Login with an user and password
export function logIn() {
  const emailLog = document.getElementById('emailLogIn').value;
  const passLog = document.getElementById('passwordLogIn').value;
  firebase.auth().signInWithEmailAndPassword(emailLog, passLog)
    .then((result) => {
      alert('Iniciaste sesion exitosamente!');
    })
    .catch((error) => {
      alert('no pudiste iniciar sesion, revisa tu nombre de usuario y/o contraseña');
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
      console.log('existe usuario activo');
      showContent();
      const displayName = user.displayName;
      const email = user.email;
      console.log(email);
      const emailVerified = user.emailVerified;
      const photoURL = user.photoURL;
      const isAnonymous = user.isAnonymous;
      const uid = user.uid;
      let textVerified = '';
      if (emailVerified === false) {
        textVerified = 'Email no verificado';
      } else {
        textVerified = 'Email verificado';
      }
      let providerData = user.providerData;
      document.getElementById('logState').innerHTML = `<div id="close"><button id='closeLogin'></button> </div>`;
      console.log(user);
    } else {
      document.getElementById('logState').innerHTML = 'NO Estas logueado!';
    }
  });
}
stateObserved();

// Sign Out
export function closingSesion() {

  firebase.auth().signOut()
    .then(() => {
      alert('cerrando sesion...');
    })
    .catch((error) => {
      console.log(error);
    });
}

function verified() {
  const user = firebase.auth().currentUser;
  user.sendEmailVerification().then(() => {
    alert('Revisa tu correo para que puedas ingresar satisfactoriamente');
  }).catch((error) => {
    alert('correo de verificación no enviado');
  });
}
