import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "getloginefforder.firebaseapp.com",
  projectId: "getloginefforder",
  storageBucket: "getloginefforder.firebasestorage.app",
  messagingSenderId: "547892671055",
  appId: "1:547892671055:web:27508253c83cfdfe71b03a",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
