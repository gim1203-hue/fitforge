import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCiDUFIUcv-fRDN02rLJRpq0CtYbvlfLIA',
  authDomain: 'fitforge-gim1203.firebaseapp.com',
  projectId: 'fitforge-gim1203',
  storageBucket: 'fitforge-gim1203.firebasestorage.app',
  messagingSenderId: '394775006264',
  appId: '1:394775006264:web:08644b4fecfbb354aeaacd',
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)
