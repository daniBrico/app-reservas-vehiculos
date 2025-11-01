import { useState, useEffect } from 'react'

export default function ModifyUser() {
  const [formData, setFormData] = useState({
    email: '',
    full_name: '',
    last_name: '',
    country: '',
    address: '',
    address_number: '',
    phone_number: '',
    fiscal_condition: '',
    document_type: '',
    document_number: '',
    current_password: '',
    new_password: ''
  })

  const [message, setMessage] = useState('')

  useEffect(() => {
    const storedUser = localStorage.getItem('UserLoginInfo')
    if (storedUser) {
      const user = JSON.parse(storedUser)
      setFormData({
        email: user.email || '',
        full_name: user.full_name || '',
        last_name: user.last_name || '',
        country: user.country || '',
        address: user.address || '',
        address_number: user.address_number || '',
        phone_number: user.phone_number || '',
        fiscal_condition: user.fiscal_condition || '',
        document_type: user.document_type || '',
        document_number: user.document_number || '',
        current_password: '',
        new_password: ''
      })
    }
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name.includes('number') ? Number(value) : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const token = localStorage.getItem('token')

    try {
      const res = await fetch('http://localhost:3000/api/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if (res.ok) {
        setMessage('Datos actualizados correctamente')
        localStorage.setItem('user', JSON.stringify(data.user))
        setFormData(data.user)
      } else {
        setMessage(data.message || 'Error al actualizar datos')
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
          Mis datos
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <input
            name="full_name"
            placeholder="Nombre"
            value={formData.full_name}
            onChange={handleChange}
            className="rounded-lg border p-2 focus:ring-2 focus:ring-amber-400 focus:outline-none"
          />
          <input
            name="last_name"
            placeholder="Apellido"
            value={formData.last_name}
            onChange={handleChange}
            className="rounded-lg border p-2 focus:ring-2 focus:ring-amber-400 focus:outline-none"
          />
          <input
            name="email"
            type="email"
            placeholder="Correo"
            value={formData.email}
            onChange={handleChange}
            className="col-span-2 rounded-lg border p-2 focus:ring-2 focus:ring-amber-400 focus:outline-none"
          />
          <input
            name="country"
            placeholder="Provincia/Ciudad"
            value={formData.country}
            onChange={handleChange}
            className="rounded-lg border p-2 focus:ring-2 focus:ring-amber-400 focus:outline-none"
          />
          <input
            name="address"
            placeholder="Calle"
            value={formData.address}
            onChange={handleChange}
            className="rounded-lg border p-2 focus:ring-2 focus:ring-amber-400 focus:outline-none"
          />
          <input
            name="address_number"
            type="number"
            placeholder="Altura"
            value={formData.address_number}
            onChange={handleChange}
            className="rounded-lg border p-2 focus:ring-2 focus:ring-amber-400 focus:outline-none"
          />
          <input
            name="phone_number"
            type="number"
            placeholder="Teléfono"
            value={formData.phone_number}
            onChange={handleChange}
            className="rounded-lg border p-2 focus:ring-2 focus:ring-amber-400 focus:outline-none"
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
            value={formData.document_number}
            onChange={handleChange}
            className="rounded-lg border p-2 focus:ring-2 focus:ring-amber-400 focus:outline-none"
          />

          <input
            name="current_password"
            type="password"
            placeholder="Contraseña actual"
            value={formData.current_password}
            onChange={handleChange}
            className="col-span-2 rounded-lg border p-2 focus:ring-2 focus:ring-amber-400 focus:outline-none"
          />
          <input
            name="new_password"
            type="password"
            placeholder="Nueva contraseña"
            value={formData.new_password}
            onChange={handleChange}
            className="col-span-2 rounded-lg border p-2 focus:ring-2 focus:ring-amber-400 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="mt-4 w-full rounded-lg bg-amber-800 py-3 font-bold text-white transition hover:bg-amber-900"
        >
          Modificar cambios
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
