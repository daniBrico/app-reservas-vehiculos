import type { IUserInput, UserLoginInfo } from '@/types/types'
import { createContext, useContext } from 'react'

export interface AuthContextProps {
  user: UserLoginInfo | null
  signUp: (signiInUser: IUserInput) => Promise<void>
}

export const AuthContext = createContext<AuthContextProps | null>(null)

export const useAuthContext = (): AuthContextProps => {
  const context = useContext(AuthContext)

  if (!context)
    throw new Error('useThemeContext must be used within an AuthProvider')

  return context
}
