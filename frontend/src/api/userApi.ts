import type {
  EmailType,
  IUserInput,
  LoginResponse,
  PasswordType,
  RegisterResponse,
  VerifyTokenResponse
} from '@/types/types'
import httpClient from './httpClient'

export const loginUser = (
  email: EmailType,
  password: PasswordType
): Promise<LoginResponse> =>
  httpClient('/api/login', { method: 'POST', body: { email, password } })

export const registerUser = (user: IUserInput): Promise<RegisterResponse> =>
  httpClient('/api/register', { method: 'POST', body: { user } })

export const verifyTokenRequest = (): Promise<VerifyTokenResponse> =>
  httpClient(`/api/verify`, { method: 'GET' })
