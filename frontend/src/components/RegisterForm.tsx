import { useState } from 'react'

export default function RegisterForm() {
  const [formData, setFormData] = useState({
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name.includes('number') ? Number(value) : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if (res.ok) {
        setMessage(`Usuario ${data.user.full_name} registrado correctamente`)
      } else {
        setMessage(data.message || 'Error desconocido')
      }
    } catch (err) {
      setMessage('Error de conexión con el servidor')
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
            onChange={handleChange}
            className="rounded-lg border p-2 focus:ring-2 focus:ring-amber-400 focus:outline-none"
            required
          />
          <input
            name="last_name"
            placeholder="Apellido"
            onChange={handleChange}
            className="rounded-lg border p-2 focus:ring-2 focus:ring-amber-400 focus:outline-none"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Correo"
            onChange={handleChange}
            className="col-span-2 rounded-lg border p-2 focus:ring-2 focus:ring-amber-400 focus:outline-none"
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Contraseña"
            onChange={handleChange}
            className="col-span-2 rounded-lg border p-2 focus:ring-2 focus:ring-amber-400 focus:outline-none"
            required
          />
          <input
            name="country"
            placeholder="País"
            onChange={handleChange}
            className="rounded-lg border p-2 focus:ring-2 focus:ring-amber-400 focus:outline-none"
            required
          />
          <input
            name="address"
            placeholder="Dirección"
            onChange={handleChange}
            className="rounded-lg border p-2 focus:ring-2 focus:ring-amber-400 focus:outline-none"
            required
          />
          <input
            name="address_number"
            type="number"
            placeholder="Número"
            onChange={handleChange}
            className="rounded-lg border p-2 focus:ring-2 focus:ring-amber-400 focus:outline-none"
            required
          />
          <input
            name="phone_number"
            type="number"
            placeholder="Teléfono"
            onChange={handleChange}
            className="rounded-lg border p-2 focus:ring-2 focus:ring-amber-400 focus:outline-none"
            required
          />
          <input
            name="fiscal_condition"
            placeholder="Condición fiscal"
            onChange={handleChange}
            className="col-span-2 rounded-lg border p-2 focus:ring-2 focus:ring-amber-400 focus:outline-none"
            required
          />
          <input
            name="document_type"
            placeholder="Tipo de documento"
            onChange={handleChange}
            className="rounded-lg border p-2 focus:ring-2 focus:ring-amber-400 focus:outline-none"
            required
          />
          <input
            name="document_number"
            type="number"
            placeholder="Número de documento"
            onChange={handleChange}
            className="rounded-lg border p-2 focus:ring-2 focus:ring-amber-400 focus:outline-none"
            required
          />
        </div>

        <button
          type="submit"
          className="mt-4 w-full rounded-lg bg-amber-800 py-3 font-bold text-white transition hover:bg-amber-900"
        >
          Registrarse
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
