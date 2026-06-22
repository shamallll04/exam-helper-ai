import { useEffect, useState } from "react"
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth"

import { auth, provider } from "./firebase"

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser)
      }
    )

    return unsubscribe
  }, [])

  async function handleLogin() {
    try {
      await signInWithPopup(auth, provider)
    } catch (error) {
      console.log(error)
    }
  }

  async function handleLogout() {
    try {
      await signOut(auth)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {!user ? (
        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl"
        >
          Sign in with Google
        </button>
      ) : (
        <div className="text-center">
          <img
            src={user.photoURL}
            alt="Profile"
            className="w-20 h-20 rounded-full mx-auto mb-4"
          />

          <h2 className="text-xl font-bold">
            {user.displayName}
          </h2>

          <p>{user.email}</p>

          <button
            onClick={handleLogout}
            className="mt-4 bg-red-600 text-white px-6 py-3 rounded-xl"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  )
}

export default App