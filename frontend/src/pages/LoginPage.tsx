import { useState } from 'react'
import axios from 'axios'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await axios.post('http://localhost:3000/api/login', {
        email,
        password
      })

      const user = res.data.user
      const token = res.data.token
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))

      //console.log('Token recibido:', res.data.token)
      //localStorage.setItem('token', res.data.token)

      setError('')
      setMessage(`Bienvenido ${res.data.user.full_name}`)
      
    window.location.href = '/inicio'
  } catch (err: any) {
    setError(err.response?.data?.message || 'Error al iniciar sesión')
    setMessage('')
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
          {message && <p className="text-center text-green-500">{message}</p>}
        </form>
      </div>
    </div>
  )
}

export default LoginPage
