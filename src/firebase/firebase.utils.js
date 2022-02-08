import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// import firebase from 'firebase/compat/app';
// import 'firebase/compat/firestore';
// import 'firebase/compat/auth';

// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

const config = {
  apiKey: "AIzaSyAdxWeQDyYgJvyquqWyjuE3dCtmgpyugoc",
  authDomain: "crwn-db-acc04.firebaseapp.com",
  projectId: "crwn-db-acc04",
  storageBucket: "crwn-db-acc04.appspot.com",
  messagingSenderId: "113567093489",
  appId: "1:113567093489:web:dfdbfd276f6d005bc34f50",
  measurementId: "G-1PDD7QGJMS"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
