import { useEffect, useRef, useState } from 'react'
import useCloseOnClickOutside from '@/hooks/useCloseOnClickOutside'
import { useAuthContext } from '@/hooks/useAuthContext'
import CancelMarkSvg from './svg-components/CancelMarkSvg'
import classNames from 'classnames'

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
    } catch (err) {
      if (err instanceof Error) {
        console.log('Ha ocurrido un error al intentar loguearse: ', err.message)
      }

      setMessage('')

      setTimeout(() => {
        setError('')
      }, 3000)
    }
  }

  return (
    <div
      className={classNames(
        'fixed inset-0 flex items-center justify-center bg-black/50 transition-all duration-300 ease-in-out',
        {
          'opacity-100': isLoginOpen,
          'pointer-events-none opacity-0': !isLoginOpen
        }
      )}
    >
      <div
        className={classNames(
          'relative w-80 rounded-lg bg-white p-8 shadow-lg',
          {
            'scale-up-center': isLoginOpen
          }
        )}
        ref={loginDivContainer}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 h-8 w-8 cursor-pointer rounded-full bg-amber-400 stroke-white transition duration-300 ease-in-out hover:scale-110 hover:bg-amber-500"
        >
          <CancelMarkSvg />
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
            className="cursor-pointer rounded bg-amber-400 py-2 font-bold text-white transition-all duration-300 ease-in-out hover:bg-amber-500"
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
