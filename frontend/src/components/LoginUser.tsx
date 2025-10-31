import { useEffect, useRef, useState } from 'react'
import useCloseOnClickOutside from '@/hooks/useCloseOnClickOutside'
import { useAuthContext } from '@/hooks/useAuthContext'

interface LoginUserProps {
  onClose: () => void
  isLoginOpen: boolean
}

const LoginUser: React.FC<LoginUserProps> = ({ onClose, isLoginOpen }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const loginDivContainer = useRef<HTMLDivElement>(null)

  useCloseOnClickOutside({
    isOpen: isLoginOpen,
    onClose: () => onClose(),
    ref: loginDivContainer
  })

  const { signIn, user } = useAuthContext()

  useEffect(() => {
    document.body.style.overflowY = 'hidden'
    return (): void => {
      document.body.style.overflowY = 'auto'
    }
  }, [])

  useEffect(() => {
    if (user === null) return

    setMessage(`Bienvenido ${user.full_name}`)
  }, [user])

  const handleLogin = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()

    try {
      signIn(email, password)
      setError('')

      setTimeout(() => {
        setMessage('')
        onClose()
      }, 4000)
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al iniciar sesión')
      setMessage('')

      setTimeout(() => {
        setError('')
      }, 3000)
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div
        className="relative w-80 rounded-lg bg-white p-8 shadow-lg"
        ref={loginDivContainer}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 rounded bg-amber-400 px-3 py-1 text-white hover:bg-amber-500"
        >
          x
        </button>

        <h2 className="mb-4 text-center text-2xl font-bold">Ingresar</h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 font-semibold">
              Correo
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingresar correo"
              required
              className="rounded border p-2"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="mb-1 font-semibold">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresar contraseña"
              required
              className="rounded border p-2"
            />
          </div>

          <button
            type="submit"
            className="rounded bg-amber-400 py-2 font-bold text-white hover:bg-amber-500"
          >
            Iniciar sesión
          </button>

          {error && <p className="text-center text-red-500">{error}</p>}
          {message && <p className="text-center text-green-500">{message}</p>}
        </form>
      </div>
    </div>
  )
}

export default LoginUser
