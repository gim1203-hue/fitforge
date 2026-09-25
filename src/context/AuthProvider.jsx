import { useEffect, useState } from 'react'
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'
import { auth, googleProvider } from '../firebase'
import { AuthContext } from './auth-context'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [authError, setAuthError] = useState('')

  useEffect(() => onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser)
    setAuthLoading(false)
  }), [])

  async function signInWithGoogle() {
    setAuthError('')
    try {
      await signInWithPopup(auth, googleProvider)
    } catch (error) {
      if (error.code !== 'auth/popup-closed-by-user') {
        setAuthError('Google sign-in could not be completed. Please try again.')
      }
    }
  }

  async function logOut() {
    setAuthError('')
    await signOut(auth)
  }

  return <AuthContext.Provider value={{ user, authLoading, authError, signInWithGoogle, logOut }}>{children}</AuthContext.Provider>
}
