import useVehicles from '@/hooks/queries/useVehicles'
import type { IVehicle } from '@/types/types'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const VehicleFleetPage: React.FC = () => {
  const navigate = useNavigate()
  const [filteredVehicles, setFilteredVehicles] = useState<IVehicle[]>([])

  // Filtros
  const [vehicleMake, setVehicleMake] = useState('')
  const [transmissionTypeFilter, setTransmissionTypeFilter] = useState('')
  const [seatingCapacity, setCapacityFilter] = useState<number>(0)
  const [maxPriceFilter, setMaxPriceFilter] = useState<number>(0)

  const { vehicles } = useVehicles()

  // Aplica filtros dinámicamente
  useEffect(() => {
    if (vehicles === null) return

    let result = [...vehicles]

    if (vehicleMake !== '')
      result = result.filter((vehicle) => vehicle.make === vehicleMake)

    if (transmissionTypeFilter !== '')
      result = result.filter(
        (vehicle) =>
          vehicle.transmissionType.toLowerCase() ===
          transmissionTypeFilter.toLowerCase()
      )

    if (seatingCapacity !== 0)
      result = result.filter(
        (vehicle) => vehicle.seatingCapacity >= seatingCapacity
      )

    if (maxPriceFilter !== 0)
      result = result.filter(
        (vehicle) => vehicle.pricePerDay <= Number(maxPriceFilter)
      )

    setFilteredVehicles(result)
  }, [
    vehicleMake,
    transmissionTypeFilter,
    seatingCapacity,
    maxPriceFilter,
    vehicles
  ])

  // Poner bien el tipo de dato de retorno
  const loadMakeFilterElement = () => {
    if (vehicles === null) return null

    const vehicleMakes: string[] = []

    return vehicles.map((vehicle) => {
      const vehicleMakeExists = vehicleMakes.includes(vehicle.make)

      if (vehicleMakeExists) return

      vehicleMakes.push(vehicle.make)

      return (
        <option key={vehicle.make} value={vehicle.make}>
          {vehicle.make}
        </option>
      )
    })
  }

  return (
    <div className="min-h-screen bg-white p-10 text-black">
      <h1 className="mb-10 text-center text-4xl font-bold">
        Nuestra flota de vehículos
      </h1>

      <div className="mb-8 flex flex-wrap justify-center gap-4">
        {/* Marca */}
        <select
          value={vehicleMake}
          onChange={(e) => setVehicleMake(e.target.value)}
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-sm transition hover:border-gray-400 focus:ring-2 focus:ring-orange-400 focus:outline-none"
        >
          <option value="">Todas las marcas</option>
          {loadMakeFilterElement()}
        </select>

        {/* Transmisión */}
        <select
          value={transmissionTypeFilter}
          onChange={(e) => setTransmissionTypeFilter(e.target.value)}
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-sm transition hover:border-gray-400 focus:ring-2 focus:ring-orange-400 focus:outline-none"
        >
          <option value="">Cualquier transmisión</option>
          <option value="Manual">Manual</option>
          <option value="Automática">Automática</option>
        </select>

        {/* Capacidad */}
        <select
          value={seatingCapacity}
          onChange={(e) => setCapacityFilter(e.target.value)}
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-sm transition hover:border-gray-400 focus:ring-2 focus:ring-orange-400 focus:outline-none"
        >
          <option value="">Todos los tamaños</option>
          <option value="4">4+ plazas</option>
          <option value="5">5+ plazas</option>
          <option value="7">7+ plazas</option>
        </select>

        {/* Precio máximo */}
        <input
          type="number"
          placeholder="Precio máx"
          value={maxPriceFilter}
          onChange={(e) =>
            setMaxPriceFilter(
              e.target.value === '' ? '' : Number(e.target.value)
            )
          }
          className="w-36 rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-sm transition hover:border-gray-400 focus:ring-2 focus:ring-orange-400 focus:outline-none"
        />
      </div>

      {/* Lista filtrada */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredVehicles.length > 0 ? (
          filteredVehicles.map((car) => (
            <div
              key={car._id}
              className="cursor-pointer rounded-xl border border-gray-200 bg-white p-6 text-black shadow-sm transition-all duration-300 hover:bg-gray-100 hover:shadow-md"
            >
              {/* Imagen con Zoom */}
              <div className="flex h-48 w-full items-center justify-center overflow-hidden rounded-md">
                <img
                  src={car.image}
                  alt={car.model}
                  className="max-h-full max-w-full object-contain transition-transform duration-500 ease-out hover:scale-110"
                />
              </div>

              <h2 className="mt-4 text-center text-xl font-semibold">
                {car.make} {car.model}
              </h2>

              <p className="mt-1 text-center text-gray-600">
                {car.seatingCapacity} Asientos · {car.transmissionType}
              </p>

              <p className="mt-3 text-center text-lg font-bold text-orange-600">
                ARS ${car.pricePerDay}/día
              </p>
              {/* Botones */}
              <div className="mt-4 flex justify-center gap-3">
                <button
                  className="rounded-lg bg-orange-500 px-4 py-2 font-medium text-white transition hover:bg-orange-600"
                  onClick={() => console.log('Reservar →', car._id)}
                >
                  Rentar ahora
                </button>

                <button
                  className="rounded-lg border border-gray-400 px-4 py-2 text-gray-700 transition hover:bg-gray-100"
                  onClick={() => navigate(`/vehiculo/${car._id}`)}
                >
                  Ver detalles
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-xl">
            No se encontraron vehículos.
          </p>
        )}
      </div>
    </div>
  )
}

export default VehicleFleetPage
