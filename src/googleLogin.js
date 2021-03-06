
// Login with a Google account

export const googleLogin = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('profile');
  provider.addScope('email');

  firebase.auth().signInWithPopup(provider).then((result) => {
  // This gives you a Google Access Token.
    const token = result.credential.accessToken;
    // The signed-in user info.
    const user = result.user;
  });
};
