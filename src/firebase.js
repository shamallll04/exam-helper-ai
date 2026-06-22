import { initializeApp } from "firebase/app"
import {
  getAuth,
  GoogleAuthProvider
} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyD8jMx5d8ZCPXcXi701tGLbD4fRZdT9UDA",
  authDomain: "studyeasyai-6e786.firebaseapp.com",
  projectId: "studyeasyai-6e786",
  storageBucket: "studyeasyai-6e786.firebasestorage.app",
  messagingSenderId: "674596607170",
  appId: "1:674596607170:web:632f3e3b5376d3231bd75b"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()