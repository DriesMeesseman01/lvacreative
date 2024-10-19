import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDLq2e72Wh6dvFN93ftOERROGkUH6horAc",
  authDomain: "lva-creative.firebaseapp.com",
  projectId: "lva-creative",
  storageBucket: "lva-creative.appspot.com",
  messagingSenderId: "730760965782",
  appId: "1:730760965782:web:0fb4258143192e395fdcb7",
  measurementId: "G-MJPKFGQZK8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
