// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA_0KKh1kygic3-22dhQBU7CkjXVtSy3rI",
  authDomain: "pf2e-tools-689ee.firebaseapp.com",
  projectId: "pf2e-tools-689ee",
  storageBucket: "pf2e-tools-689ee.appspot.com",
  messagingSenderId: "151708374991",
  appId: "1:151708374991:web:ae92e45eba7e0f0a33e4ba",
  measurementId: "G-TJPEY1JHNV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
