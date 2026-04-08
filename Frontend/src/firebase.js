// import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

// // Firebase Config (jo Firebase console se mila hai, wahi paste karna)
// const firebaseConfig = {
//   apiKey: "AIzaSyA9H33tNt06Abm3djaR6wPViL9fiEAeSTM",
//   authDomain: "foodstore-app-6af09.firebaseapp.com",
//   projectId: "foodstore-app-6af09",
//   storageBucket: "foodstore-app-6af09.firebasestorage.app",
//   messagingSenderId: "96630506607",
//   appId: "1:96630506607:web:7233cf11528ce2b659b99a",
//   measurementId: "G-KJ7RW3H9M9"
// };

// // ✅ Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // ✅ Auth instance
// export const auth = getAuth(app);

// // ✅ Google Auth Provider
// export const googleProvider = new GoogleAuthProvider();

// // ✅ OTP Helper Functions
// export const setUpRecaptcha = (number) => {
//   const recaptchaVerifier = new RecaptchaVerifier(
//     "recaptcha-container",   // 👈 HTML me ek div bana dena
//     { size: "invisible" },
//     auth
//   );
//   return signInWithPhoneNumber(auth, number, recaptchaVerifier);
// };



import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// 🔑 Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyA9H33tNt06Abm3djaR6wPViL9fiEAeSTM",
  authDomain: "foodstore-app-6af09.firebaseapp.com",
  projectId: "foodstore-app-6af09",
  storageBucket: "foodstore-app-6af09.appspot.com",
  messagingSenderId: "96630506607",
  appId: "1:96630506607:web:7233cf11528ce2b659b99a",
  measurementId: "G-KJ7RW3H9M9",
};

// 🚀 Initialize
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();

/**
 * Create/return a safe RecaptchaVerifier instance.
 * Handles both render-twice and signature issues.
 */
const getRecaptcha = (containerId = "recaptcha-container") => {
  // If already created, clear it so "already rendered" error na aaye
  if (window.recaptchaVerifier) {
    try {
      window.recaptchaVerifier.clear();
    } catch (_) {}
    window.recaptchaVerifier = null;
  }

  let verifier;
  // ✅ Correct signature for modular SDK
  try {
    verifier = new RecaptchaVerifier(
      auth,                   // <- IMPORTANT
      containerId,
      {
        size: "invisible",
        callback: () => console.log("reCAPTCHA verified ✅"),
        "expired-callback": () => console.warn("reCAPTCHA expired"),
      }
    );
  } catch (e) {
    // Fallback for older signature (just in case)
    verifier = new RecaptchaVerifier(
      containerId,
      {
        size: "invisible",
        callback: () => console.log("reCAPTCHA verified ✅ (fallback)"),
        "expired-callback": () => console.warn("reCAPTCHA expired"),
      },
      auth
    );
  }

  window.recaptchaVerifier = verifier;
  return verifier;
};

export {
  auth,
  db,
  storage,
  googleProvider,
  signInWithPhoneNumber,
  getRecaptcha,
};