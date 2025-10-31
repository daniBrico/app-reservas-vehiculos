import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { connectDB } from "../../config/db";
import Vehicle from "../../models/mongoDB/schemas/vehicle.model";
import vehicles from "./vehicles.json";

interface Vehicle {
  _id: string
  make: string
  model: string
  transmissionType: string
  seatingCapacity: number
  year: number
  licencePlate: string
  pricePerDay: number
  status: string
  image: string
  warrantyCost: number
  description: string
}

const VehicleFleetPage: React.FC = () => {
  const navigate = useNavigate()
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([])

  // Filtros
  const [makeFilter, setMakeFilter] = useState('')
  const [transmissionFilter, setTransmissionFilter] = useState('')
  const [capacityFilter, setCapacityFilter] = useState('')
  const [maxPriceFilter, setMaxPriceFilter] = useState<number | ''>('')

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/vehicles`)
      .then((res) => res.json())
      .then((data) => {
        setVehicles(data)
        setFilteredVehicles(data)
      })
      .catch((err) => console.log('Error al obtener vehículos:', err))
  }, [])

  // Aplica filtros dinámicamente
  useEffect(() => {
    let result = [...vehicles]

    if (makeFilter) {
      result = result.filter((car) => car.make === makeFilter)
    }

    if (transmissionFilter) {
      result = result.filter(
        (car) => car.transmissionType === transmissionFilter
      )
    }

    if (capacityFilter) {
      result = result.filter(
        (car) => car.seatingCapacity >= Number(capacityFilter)
      )
    }

    if (maxPriceFilter !== '') {
      result = result.filter((car) => car.pricePerDay <= Number(maxPriceFilter))
    }

    setFilteredVehicles(result)
  }, [makeFilter, transmissionFilter, capacityFilter, maxPriceFilter, vehicles])

  return (
    <div className="min-h-screen bg-white p-10 text-black">
      <h1 className="mb-10 text-center text-4xl font-bold">
        Nuestra flota de vehículos
      </h1>

      <div className="mb-8 flex flex-wrap justify-center gap-4">
        {/* Marca */}
        <select
          value={makeFilter}
          onChange={(e) => setMakeFilter(e.target.value)}
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-sm transition hover:border-gray-400 focus:ring-2 focus:ring-orange-400 focus:outline-none"
        >
          <option value="">Todas las marcas</option>
          {Array.from(new Set(vehicles.map((v) => v.make))).map((make) => (
            <option key={make} value={make}>
              {make}
            </option>
          ))}
        </select>

        {/* Transmisión */}
        <select
          value={transmissionFilter}
          onChange={(e) => setTransmissionFilter(e.target.value)}
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-sm transition hover:border-gray-400 focus:ring-2 focus:ring-orange-400 focus:outline-none"
        >
          <option value="">Cualquier transmisión</option>
          <option value="Manual">Manual</option>
          <option value="Automatic">Automática</option>
        </select>

        {/* Capacidad */}
        <select
          value={capacityFilter}
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
