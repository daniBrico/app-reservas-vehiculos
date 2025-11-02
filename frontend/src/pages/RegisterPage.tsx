import { type JSX } from 'react'
import RegisterForm from '../components/RegisterForm'

export default function RegisterPage(): JSX.Element {
  return (
    <div className="flex h-full w-full items-center justify-center px-16 py-8">
      <RegisterForm />
    </div>
  )
}
