import { useState, useEffect, type JSX } from 'react'
import InputField from '../InputField'
import useGetProfileInfo from '@/hooks/queries/useGetProfileInfo'
import { useAuthContext } from '@/hooks/useAuthContext'
import httpClient from '@/api/httpClient'

const ProfileForm = (): JSX.Element => {
  const [formData, setFormData] = useState({
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

  const { user } = useAuthContext()
  const { userProfileInfo, fetchProfileInfo } = useGetProfileInfo()

  useEffect(() => {
    if (!userProfileInfo) return

    setFormData({
      full_name: userProfileInfo.full_name || '',
      last_name: userProfileInfo.last_name || '',
      country: userProfileInfo.country || '',
      address: userProfileInfo.address || '',
      address_number: userProfileInfo.address_number || 0,
      phone_number: userProfileInfo.phone_number || 0,
      fiscal_condition: userProfileInfo.fiscal_condition || '',
      document_type: userProfileInfo.document_type || '',
      document_number: userProfileInfo.document_number || 0
    })
  }, [userProfileInfo])

  useEffect(() => {
    if (!user) return
    fetchProfileInfo(user._id)
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
    if (!user) return

    const body = { email: user.email, ...formData }

    try {
      const data = await httpClient<{ user: typeof formData; message: string }>(
        '/api/update',
        {
          method: 'PUT',
          body
        }
      )

      setMessage('Datos actualizados correctamente')
      localStorage.setItem('user', JSON.stringify(data.user))
      setFormData(data.user)
    } catch (err) {
      if (err instanceof Error) {
        console.error('Error al actualizar los datos del usuario:', err)
      } else {
        console.error('Error desconocido al actualizar los datos del usuario')
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid w-full grid-cols-3 space-y-4 bg-white"
    >
      <h2 className="col-span-3 mb-6 text-center text-3xl font-bold text-amber-800">
        Mis datos
      </h2>

      <div className="col-span-3 grid grid-cols-2 gap-6 md:grid-cols-2">
        {/* Nombre y Apellido (bloqueados) */}
        <div className="col-span-2 grid w-full grid-cols-2 gap-2">
          <InputField
            label="Nombre completo"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            disabled={true}
            className="cursor-not-allowed bg-gray-200"
          />
          <InputField
            label="Apellido"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            disabled={true}
            className="cursor-not-allowed bg-gray-200"
          />
        </div>

        {/* Dirección y Teléfono (editables) */}
        <div className="col-span-2 grid grid-cols-3 gap-2">
          <InputField
            label="Provincia/Ciudad"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          />
          <InputField
            label="Calle"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <InputField
            label="Número de calle"
            name="address_number"
            type="number"
            value={formData.address_number}
            onChange={handleChange}
            required
          />
        </div>

        <InputField
          label="Teléfono"
          name="phone_number"
          type="number"
          value={formData.phone_number}
          onChange={handleChange}
          required
        />

        {/* Condición fiscal (editable) */}
        <label htmlFor="fiscal_condition" className="sr-only">
          Condición fiscal
        </label>
        <select
          id="fiscal_condition"
          name="fiscal_condition"
          value={formData.fiscal_condition}
          onChange={handleChange}
          className="rounded-lg border p-2 focus:ring-2 focus:ring-amber-400 focus:outline-none"
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

        {/* Tipo y Número de Documento (bloqueados) */}
        <label htmlFor="document_type" className="sr-only">
          Tipo de documento
        </label>
        <select
          id="document_type"
          name="document_type"
          value={formData.document_type}
          onChange={handleChange}
          disabled={true}
          className="cursor-not-allowed rounded-lg border bg-gray-200 p-2 focus:outline-none"
        >
          <option value="" disabled>
            Tipo de documento
          </option>
          <option value="DNI">DNI</option>
          <option value="LE">LE</option>
          <option value="LC">LC</option>
        </select>

        <InputField
          label="Número de Documento"
          name="document_number"
          type="number"
          value={formData.document_number}
          onChange={handleChange}
          disabled={true}
          className="cursor-not-allowed bg-gray-200"
        />
      </div>

      <button
        type="submit"
        className="col-start-2 col-end-2 w-full cursor-pointer rounded-lg bg-amber-800 py-3 font-bold text-white transition-all duration-300 ease-in-out hover:bg-amber-900"
      >
        Guardar cambios
      </button>

      {message && (
        <p className="col-span-3 mt-2 text-center font-medium text-green-600">
          {message}
        </p>
      )}
    </form>
  )
}

export default ProfileForm
