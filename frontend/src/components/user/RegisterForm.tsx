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
    <section>
      <form onSubmit={handleSubmit}>
        <h2 className="mb-8 text-left text-3xl font-bold text-amber-800">
          Registro de Usuario
        </h2>

        <div className="grid max-w-2xl grid-cols-2 gap-x-4 gap-y-8 [&_input]:h-11 [&_select]:h-11">
          <div className="col-span-2 grid grid-cols-3 gap-2">
            <div className="relative w-full">
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="peer h-11 w-full rounded-lg border border-gray-300 px-2 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                placeholder=""
                required
              />
              <label className="pointer-events-none absolute left-0 pl-2 text-base text-black/50 transition-all duration-200 peer-placeholder-shown:top-2.5 peer-focus:-top-6">
                Provincia/Ciudad
              </label>
            </div>
            <div className="relative w-full">
              <input
                name="address"
                placeholder=""
                value={formData.address}
                onChange={handleChange}
                className="peer rounded-lg border p-2 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                required
              />
              <label className="pointer-events-none absolute left-0 pl-2 text-base text-black/50 transition-all duration-200 peer-placeholder-shown:top-2.5 peer-focus:-top-6">
                Calle
              </label>
            </div>
            <div className="relative w-full">
              <input
                name="address_number"
                type="number"
                placeholder=""
                value={
                  formData.address_number === 0 ? '' : formData.address_number
                }
                onChange={handleChange}
                className="peer rounded-lg border p-2 focus:ring-2 focus:ring-amber-400 focus:outline-none"
                required
              />
              <label className="pointer-events-none absolute left-0 pl-2 text-base text-black/50 transition-all duration-200 peer-placeholder-shown:top-2.5 peer-focus:-top-6">
                Número de calle
              </label>
            </div>
          </div>
          <div className="relative w-full">
            <input
              name="phone_number"
              type="number"
              placeholder=""
              value={formData.phone_number === 0 ? '' : formData.phone_number}
              onChange={handleChange}
              className="peer w-full rounded-lg border p-2 focus:ring-2 focus:ring-amber-400 focus:outline-none"
              required
            />
            <label className="pointer-events-none absolute left-0 pl-2 text-base text-black/50 transition-all duration-200 peer-placeholder-shown:top-2.5 peer-focus:-top-6">
              Teléfono
            </label>
          </div>

          <label htmlFor="fiscal_condition" className="sr-only">
            Condición fiscal
          </label>
          <select
            id="fiscal_condition"
            name="fiscal_condition"
            value={formData.fiscal_condition}
            onChange={handleChange}
            className="rounded-lg border pl-1 text-black/50 focus:ring-2 focus:ring-amber-400 focus:outline-none"
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
            className="rounded-lg border pl-1 text-black/50 focus:ring-2 focus:ring-amber-400 focus:outline-none"
            required
          >
            <option value="" disabled>
              Tipo de documento
            </option>
            <option value="DNI">DNI</option>
            <option value="LE">LE</option>
            <option value="LC">LC</option>
          </select>
          <div className="relative w-full">
            <input
              name="document_number"
              type="number"
              placeholder=""
              value={
                formData.document_number === 0 ? '' : formData.document_number
              }
              onChange={handleChange}
              className="peer w-full rounded-lg border p-2 focus:ring-2 focus:ring-amber-400 focus:outline-none"
              required
            />
            <label className="pointer-events-none absolute left-0 pl-2 text-base text-black/50 transition-all duration-200 peer-placeholder-shown:top-2.5 peer-focus:-top-6">
              Número de Documento
            </label>
          </div>
          <div className="relative w-full">
            <input
              name="email"
              type="email"
              placeholder=""
              value={formData.email}
              onChange={handleChange}
              className="peer w-full rounded-lg border p-2 focus:ring-2 focus:ring-amber-400 focus:outline-none"
              required
            />
            <label className="pointer-events-none absolute left-0 pl-2 text-base text-black/50 transition-all duration-200 peer-placeholder-shown:top-2.5 peer-focus:-top-6">
              Correo
            </label>
          </div>
          <div className="relative w-full">
            <input
              name="password"
              type="password"
              placeholder=""
              value={formData.password}
              onChange={handleChange}
              className="peer w-full rounded-lg border p-2 focus:ring-2 focus:ring-amber-400 focus:outline-none"
              required
            />
            <label className="pointer-events-none absolute left-0 pl-2 text-base text-black/50 transition-all duration-200 peer-placeholder-shown:top-2.5 peer-focus:-top-6">
              Contraseña
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="transition-color w-full cursor-pointer rounded-lg bg-amber-800 py-3 font-bold text-white duration-300 hover:bg-amber-900 disabled:bg-amber-400"
          >
            {loading ? 'Registrando...' : 'Registrarse'}
          </button>
        </div>

        {message && (
          <p className="mt-2 text-center font-medium text-green-600">
            {message}
          </p>
        )}
      </form>
    </section>
  )
}

export default RegisterForm
