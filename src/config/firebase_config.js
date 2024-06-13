// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

// import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAv5tv6nmixvMS5venP_d4Nb71BBbjL9H4',
  authDomain: 'cv-analyzer-b989b.firebaseapp.com',
  databaseURL: 'https://cv-analyzer-b989b-default-rtdb.firebaseio.com',
  projectId: 'cv-analyzer-b989b',
  storageBucket: 'cv-analyzer-b989b.appspot.com',
  messagingSenderId: '85089906130',
  appId: '1:85089906130:web:30a6fc15870df0ea186c0b',
  measurementId: 'G-J5V6MJ7PH6',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account ',
});

export const auth = getAuth(app);
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export default app;
