import type { JSX } from 'react'
import RegisterForm from '../components/RegisterForm'

export default function RegisterPage(): JSX.Element {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <RegisterForm />
    </div>
  )
}
