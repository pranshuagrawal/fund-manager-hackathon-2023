// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyA1hfOKcU2MV9wieBPX1KjYvNifQrUQ-dY',
  authDomain: 'fund-manager-911ad.firebaseapp.com',
  projectId: 'fund-manager-911ad',
  storageBucket: 'fund-manager-911ad.appspot.com',
  messagingSenderId: '58069962289',
  appId: '1:58069962289:web:13151978360a5519b88f10',
  measurementId: 'G-ZCGQ9M4GS1',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
