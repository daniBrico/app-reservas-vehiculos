import { useAuthContext } from '@/hooks/useAuthContext'
import type { IUserInput } from '@/types/types'
import { useEffect, useState, type JSX } from 'react'
import { useNavigate } from 'react-router-dom'

const RegisterForm = (): JSX.Element => {
  const [formData, setFormData] = useState<IUserInput>({
    email: '',
    password: '',
    full_name: '',
    last_name: '',
    country: '',
    address: '',
    address_number: 0,
    phone_number: 0,
    fiscal_condition: '',
    document_type: '',
    document_number: 0
  })

  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const { signUp, user } = useAuthContext()

  useEffect(() => {
    if (user === null) return

    setMessage(`Bienvenido ${user.full_name}, registro exitoso!`)
  }, [user])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name.includes('number') ? Number(value) : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()

    setLoading(true)

    try {
      signUp(formData)

      setFormData({
        email: '',
        password: '',
        full_name: '',
        last_name: '',
        country: '',
        address: '',
        address_number: 0,
        phone_number: 0,
        fiscal_condition: '',
        document_type: '',
        document_number: 0
      })

      setTimeout(() => {
        setMessage('')
        navigate('/inicio')
        window.location.reload()
      }, 2000)
    } catch (err) {
      if (err instanceof Error) {
        setMessage('Error de conexión con el servidor')
      } else {
        setMessage('Error desconocido')
      }
      setTimeout(() => setMessage(''), 5000)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg space-y-4 rounded-xl bg-white p-8 shadow-lg"
      >
        <h2 className="mb-6 text-center text-3xl font-bold text-amber-800">
          Registro de Usuario
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <input
            name="full_name"
            placeholder="Nombre"
            value={formData.full_name}
            onChange={handleChange}
            className="rounded-lg border p-2 focus:ring-2 focus:ring-amber-400 focus:outline-none"
            required
          />
          <input
            name="last_name"
            placeholder="Apellido"
            value={formData.last_name}
            onChange={handleChange}
            className="rounded-lg border p-2 focus:ring-2 focus:ring-amber-400 focus:outline-none"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Correo"
            value={formData.email}
            onChange={handleChange}
            className="col-span-2 rounded-lg border p-2 focus:ring-2 focus:ring-amber-400 focus:outline-none"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            className="col-span-2 rounded-lg border p-2 focus:ring-2 focus:ring-amber-400 focus:outline-none"
            required
          />
          <input
            name="country"
            placeholder="Provincia/Ciudad"
            value={formData.country}
            onChange={handleChange}
            className="rounded-lg border p-2 focus:ring-2 focus:ring-amber-400 focus:outline-none"
            required
          />
          <input
            name="address"
            placeholder="Calle"
            value={formData.address}
            onChange={handleChange}
            className="rounded-lg border p-2 focus:ring-2 focus:ring-amber-400 focus:outline-none"
            required
          />
          <input
            name="address_number"
            type="number"
            placeholder="Altura"
            value={formData.address_number === 0 ? '' : formData.address_number}
            onChange={handleChange}
            className="rounded-lg border p-2 focus:ring-2 focus:ring-amber-400 focus:outline-none"
            required
          />
          <input
            name="phone_number"
            type="number"
            placeholder="Teléfono"
            value={formData.phone_number === 0 ? '' : formData.phone_number}
            onChange={handleChange}
            className="rounded-lg border p-2 focus:ring-2 focus:ring-amber-400 focus:outline-none"
            required
          />
          <label htmlFor="fiscal_condition" className="sr-only">
            Condición fiscal
          </label>
          <select
            id="fiscal_condition"
            name="fiscal_condition"
            value={formData.fiscal_condition}
            onChange={handleChange}
            className="col-span-2 rounded-lg border p-2 focus:ring-2 focus:ring-amber-400 focus:outline-none"
            required
          >
            <option value="" disabled>
              Condición fiscal
            </option>
            <option value="Responsable inscripto">Responsable inscripto</option>
            <option value="Autónomo">Autónomo</option>
            <option value="Monotributista">Monotributista</option>
            <option value="Exento">Exento</option>
            <option value="No alcanzado">No alcanzado</option>
          </select>

          <label htmlFor="document_type" className="sr-only">
            Tipo de documento
          </label>
          <select
            id="document_type"
            name="document_type"
            value={formData.document_type}
            onChange={handleChange}
            className="rounded-lg border p-2 focus:ring-2 focus:ring-amber-400 focus:outline-none"
            required
          >
            <option value="" disabled>
              Tipo de documento
            </option>
            <option value="DNI">DNI</option>
            <option value="LE">LE</option>
            <option value="LC">LC</option>
          </select>
          <input
            name="document_number"
            type="number"
            placeholder="Número de documento"
            value={
              formData.document_number === 0 ? '' : formData.document_number
            }
            onChange={handleChange}
            className="rounded-lg border p-2 focus:ring-2 focus:ring-amber-400 focus:outline-none"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full rounded-lg bg-amber-800 py-3 font-bold text-white transition hover:bg-amber-900 disabled:bg-amber-400"
        >
          {loading ? 'Registrando...' : 'Registrarse'}
        </button>

        {message && (
          <p className="mt-2 text-center font-medium text-green-600">
            {message}
          </p>
        )}
      </form>
    </div>
  )
}

export default RegisterForm
