import { useState } from 'react'
import axios from 'axios'

const LoginPage = ({ onClose }: { onClose?: () => void }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await axios.post('http://localhost:3000/api/auth/login', {
        email,
        password
      })

      console.log('Token recibido:', res.data.token)
      localStorage.setItem('token', res.data.token)

      setError('')
      if (onClose) onClose()
    } catch (err: any) {
      console.error('Error completo:', err.response?.data || err.message)
      setError(err.response?.data?.error || 'Error al iniciar sesión')
      alert(err.response?.data?.error || 'Error al iniciar sesión')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-80 rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-4 text-center text-2xl font-bold">Iniciar Sesión</h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 font-semibold">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingresa tu email"
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
              placeholder="Ingresa tu contraseña"
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
        </form>
      </div>
    </div>
  )
}

export default LoginPage
