// function Sign Out
function closingSesion() {
  firebase.auth().signOut()
    .then(() => {
      alert('cerrando sesion...');
    })
    .catch(() => {
      console.log();
    });
}
// function to verify your email adress

function verified() {
  const user = firebase.auth().currentUser;
  user.sendEmailVerification().then(() => {
    alert('Revisa tu correo para que puedas ingresar satisfactoriamente');
  }).catch(() => {
    alert('correo de verificación no enviado');
  });
}
//  if login permit close session
function showContent() {
  const showing = document.getElementById('contenido');
  showing.innerHTML = `
  <p> Bienvenido(a)! </p> 
  <button class="btn" id="closing"> Cerrar Sesion </button>
  `;
  document.getElementById('closing').addEventListener('click', closingSesion);
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
      alert('el correo o la contraseña no son válidas(la contraseña debe tener 6 caracteres o más)');
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
      document.getElementById('logState').innerHTML = 'No existe ususario(a) activo(a)';
    });
}


// Initialize Cloud Firestore - Firebase
const db = firebase.firestore();

// delete documents
export function deletePost(id) {
  db.collection('newPost').doc(id).delete().then(() => {
    console.log('Document successfully deleted!');
  })
    .catch((error) => {
      console.error('Error removing document: ', error);
    });
}

export function createPost() {
  db.collection('newPost').add({
    email: firebase.auth().currentUser.email,
    uid: firebase.auth().currentUser.uid,
    post: document.getElementById('textPost').value,
  })
    .then((docRef) => {
      console.log('Document written with ID: ', docRef.id);
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
      alert('Para poder crear un nuevo post necesitas ingresar a tu cuenta con un usuario válido');
    });
}

// reading a new Document
const divPost = document.getElementById('divToPost');

db.collection('newPost').onSnapshot((querySnapshot) => {
  divPost.innerHTML = '';
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
    divPost.innerHTML += ` 
    <div id="Post">
        <div id="newPostUser">
         
         ${doc.data().email}
        </div>
        <div id="newPostText">
        ${doc.data().post}
        </div>
        <div id="btnesPost">
          <button id="btnEditPost" class="btn" onclick="Editar('')"> Editar Post </button> 
          <button id='btnDeletePost-${doc.id}' class="btn"> Eliminar </button>
        </div>
    </div>`;
    const btnDelete = document.getElementById(`btnDeletePost-${doc.id}`);
    btnDelete.addEventListener('click', () => {
      deletePost(doc.id);
    });
  });
});

// Observer state
export function stateObserved() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      showContent();
      createPost();
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
      if (user) {
        createPost();
      } else {
        alert('Para poder crear un nuevo post necesitas ingresar a tu cuenta con un usuario válido');
      }
    }
  });
}
stateObserved();
/*
// recover password
let recoverPass = function() {
  let auth = firebase.auth();
  let emailAddress = ${'#email'}.val();

  auth.sendPasswordResetEmail(emailAddress)
  .then(function() {
  // Email sent.
  alert('Se ha enviado un correo a su cuenta, por favor siga los pasos indicados');
}).catch(function(error) {
  // An error happened.
});
}

*/
