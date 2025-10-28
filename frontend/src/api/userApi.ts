import type { EmailType, LoginResponse, PasswordType } from '@/types/types'
import httpClient from './httpClient'

export const registerUser = (
  email: EmailType,
  password: PasswordType
): Promise<LoginResponse> =>
  httpClient('/api/login', { method: 'POST', body: { email, password } })
