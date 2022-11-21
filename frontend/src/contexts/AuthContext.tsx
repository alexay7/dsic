import React, { createContext, useContext, useState, useEffect } from 'react'
import { loggedRequest } from '../api/api'

import { User } from '../types/user'

interface AuthContextType {
  userData: User | null
  setUserData: (v: User) => void
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)
export function useAuth (): AuthContextType {
  return useContext(AuthContext)
}

interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider (props: AuthProviderProps): React.ReactElement {
  const [userData, setUserData] = useState<User | null>(null)
  const { children } = props

  useEffect(() => {
    async function getData (): Promise<void> {
      const response = await loggedRequest('me', { method: 'GET' }) as User
      setUserData(response)
    }
    if (!userData) {
      void getData()
    }
  }, [userData])

  return (
        <AuthContext.Provider value={{ userData, setUserData }}>
            {children}
        </AuthContext.Provider>
  )
}
