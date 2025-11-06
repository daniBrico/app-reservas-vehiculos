import { useEffect, useState, type JSX } from 'react'
import ProfileUser from '../components/user/ProfileUser'
import httpClient from '@/api/httpClient'

interface Vehicle {
  _id: string
  title: string
  make: string
  licencePlate: string
  year: number
  transmissionType: string
  seatingCapacity: number
  trunkCapacity: number
  pricePerDay: number
  description: string
}

interface Reservation {
  _id: string
  vehicle_id: Vehicle
  pickup_date: string
  return_date: string
  pickup_time: string
  return_time: string
  pickup_location: string
  discount_code?: string
  insurance_policy_id?: string
  status: string
}

export default function UserProfilePage(): JSX.Element {
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [loading, setLoading] = useState(true)

  const discountPercentages: Record<string, number> = {
    DESC5: 5,
    DESC10: 10,
    DESC15: 15,
    DESC20: 20
  }

  useEffect(() => {
    const fetchReservations = async (): Promise<void> => {
      try {
        const data = await httpClient<{
          message: string
          reservations: Reservation[]
        }>('/reservations', {
          method: 'GET'
        })
        setReservations(data.reservations)
      } catch (error) {
        console.error('Error al cargar historial:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchReservations()
  }, [])

  return (
    <div className="grid w-full grid-cols-2 gap-8 px-16 py-8">
      <aside>
        <ProfileUser />
      </aside>

      <section className="px-8">
        <div className="relative mt-4 h-full rounded-md border border-amber-100 bg-amber-50 p-4 shadow-md shadow-amber-100">
          <h3 className="absolute -top-6 text-center font-bold tracking-wide text-amber-900">
            Historial de reservas
          </h3>

          {loading ? (
            <p className="p-4 text-amber-900/70">Cargando reservas...</p>
          ) : reservations.length === 0 ? (
            <h4 className="rounded-md bg-amber-100 p-4 text-xl font-medium text-amber-900/70">
              Sin reserva de vehículos
            </h4>
          ) : (
            <ul className="space-y-2">
              {reservations.map((r) => {
                const originalPrice = r.vehicle_id?.pricePerDay || 0
                const discount = r.discount_code
                  ? discountPercentages[r.discount_code] || 0
                  : 0
                const finalPrice = originalPrice * (1 - discount / 100)

                return (
                  <li
                    key={r._id}
                    className="flex gap-4 rounded-md border border-amber-100 bg-white p-4 shadow-sm"
                  >
                    <div className="flex flex-col justify-between">
                      <p className="font-semibold text-amber-900">
                        {r.vehicle_id?.make} {r.vehicle_id?.title} (
                        {r.vehicle_id?.licencePlate})
                      </p>
                      <p className="text-sm text-amber-900/80">
                        Año {r.vehicle_id?.year} •{' '}
                        {r.vehicle_id?.transmissionType} •{' '}
                        {r.vehicle_id?.seatingCapacity} pasajeros
                      </p>
                      <p className="text-amber-900/80">
                        Retiro: {new Date(r.pickup_date).toLocaleDateString()} —{' '}
                        {r.pickup_time}
                      </p>
                      <p className="text-amber-900/80">
                        Devolución:{' '}
                        {new Date(r.return_date).toLocaleDateString()} —{' '}
                        {r.return_time}
                      </p>

                      <p className="text-amber-900/80">
                        Precio por día: ${finalPrice.toFixed(2)}
                        {discount > 0 && (
                          <span className="ml-2 text-green-700">
                            ({discount}% de descuento aplicado)
                          </span>
                        )}
                      </p>

                      <p className="text-amber-900/80">
                        Lugar: {r.pickup_location}
                      </p>

                      {r.discount_code ? (
                        discount > 0 ? (
                          <p className="text-sm text-green-700">
                            Código de descuento: {r.discount_code}
                          </p>
                        ) : (
                          <p className="text-sm text-red-600 italic">
                            Código inválido: {r.discount_code}
                          </p>
                        )
                      ) : (
                        <p className="text-sm text-gray-500 italic">
                          Sin código de descuento
                        </p>
                      )}

                      <p className="text-amber-900/70 italic">
                        Estado: {r.status}
                      </p>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </section>
    </div>
  )
}
