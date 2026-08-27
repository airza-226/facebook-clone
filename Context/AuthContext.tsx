"use client"
import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { onAuthStateChanged, User } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { fetchUserProfile } from "@/api/User/fetchUserProfile"
import { userData,AuthContextType } from "@/types"


const AuthContext = createContext<AuthContextType>({
  firebaseUser: null,
  userProfile: null,
  loading: true,
  refreshProfile: async () => {}, 
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null)
  const [userProfile, setUserProfile] = useState<userData | null>(null)
  const [loading, setLoading] = useState(true)

  const refreshProfile = async () => {
    if (auth.currentUser) {
      try {
        const profile = await fetchUserProfile(auth.currentUser.uid)
        setUserProfile(profile)
      } catch {
        setUserProfile(null)
      }
    } else return
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setFirebaseUser(user)
      if (user) {
        const profile = await fetchUserProfile(user.uid)
        setUserProfile(profile)
      } else {
        setUserProfile(null)
      }
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  return (
    
    <AuthContext.Provider value={{ firebaseUser, userProfile, loading, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)