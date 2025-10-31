import { registerUser } from '@/api/userApi'
import { AuthContext, type AuthContextProps } from '@/hooks/useAuthContext'
import type { IUserInput, RegisterResponse, UserLoginInfo } from '@/types/types'
import { useState, type JSX, type ReactNode } from 'react'

interface AuthProviderProps {
  children: ReactNode
}

const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [user, setUser] = useState<UserLoginInfo | null>(null)
  const [error, setError] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleAuthSuccess = (res: RegisterResponse): void => {
    setUser(res.userLoginInfo)
    setIsAuthenticated(true)
  }

  const signUp = async (signInUser: IUserInput): Promise<void> => {
    try {
      const res = await registerUser(signInUser)

      handleAuthSuccess(res)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        console.log('Error desconocido')
      }
    }
  }

  const value: AuthContextProps = { user, signUp }

  return <AuthContext value={value}>{children}</AuthContext>
}

export default AuthProvider
