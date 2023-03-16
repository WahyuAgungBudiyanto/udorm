// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getDatabase} from 'firebase/database';
import {getStorage} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCmCvOn0SBBQOB-VgXNpqwHlQnd1AANkSY',
  authDomain: 'udorm-e19e4.firebaseapp.com',
  databaseURL:
    'https://udorm-e19e4-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'udorm-e19e4',
  storageBucket: 'udorm-e19e4.appspot.com',
  messagingSenderId: '274263141809',
  appId: '1:274263141809:web:f9e79725ec63a5af726190',
  measurementId: 'G-41GPGZB11H',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default authentication = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);