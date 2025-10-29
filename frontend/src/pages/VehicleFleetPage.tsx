import { useEffect, useState } from "react";

interface Vehicle {
  _id: string;
  make: string;
  model: string;
  transmissionType: string;
  seatingCapacity: number;
  year: number;
  licencePlate: string;
  pricePerDay: number;
  status: string;
  image: string;
  warrantyCost: number;
  description: string;
}

const VehicleFleetPage: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);

  // Filtros
  const [makeFilter, setMakeFilter] = useState("");
  const [transmissionFilter, setTransmissionFilter] = useState("");
  const [capacityFilter, setCapacityFilter] = useState("");
  const [maxPriceFilter, setMaxPriceFilter] = useState<number | "">("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/vehicles`)
      .then((res) => res.json())
      .then((data) => {
        setVehicles(data);
        setFilteredVehicles(data);
      })
      .catch((err) => console.log("Error al obtener vehículos:", err));
  }, []);

  // Aplica filtros dinámicamente
  useEffect(() => {
    let result = [...vehicles];

    if (makeFilter) {
      result = result.filter((car) => car.make === makeFilter);
    }

    if (transmissionFilter) {
      result = result.filter((car) => car.transmissionType === transmissionFilter);
    }

    if (capacityFilter) {
      result = result.filter((car) => car.seatingCapacity >= Number(capacityFilter));
    }

    if (maxPriceFilter !== "") {
      result = result.filter((car) => car.pricePerDay <= Number(maxPriceFilter));
    }

    setFilteredVehicles(result);
  }, [makeFilter, transmissionFilter, capacityFilter, maxPriceFilter, vehicles]);

  return (
    <div className="bg-orange-500 min-h-screen text-white p-10">
      <h1 className="text-4xl font-bold text-center mb-10">
        Nuestra flota de vehículos
      </h1>

      {/* Filtros */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">

        {/* Marca */}
        <select
          value={makeFilter}
          onChange={(e) => setMakeFilter(e.target.value)}
          className="p-2 rounded text-black"
        >
          <option value="">Todas las marcas</option>
          {Array.from(new Set(vehicles.map((v) => v.make))).map((make) => (
            <option key={make} value={make}>{make}</option>
          ))}
        </select>

        {/* Transmisión */}
        <select
          value={transmissionFilter}
          onChange={(e) => setTransmissionFilter(e.target.value)}
          className="p-2 rounded text-black"
        >
          <option value="">Cualquier transmisión</option>
          <option value="Manual">Manual</option>
          <option value="Automatic">Automática</option>
        </select>

        {/* Capacidad mínima */}
        <select
          value={capacityFilter}
          onChange={(e) => setCapacityFilter(e.target.value)}
          className="p-2 rounded text-black"
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
          onChange={(e) => setMaxPriceFilter(e.target.value === "" ? "" : Number(e.target.value))}
          className="p-2 rounded text-black w-36"
        />
      </div>

      {/* Lista filtrada */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredVehicles.length > 0 ? (
          filteredVehicles.map((car) => (
            <div
              key={car._id}
              className="bg-white text-black p-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <img src={car.image} alt={car.model} className="w-full h-40 object-contain"/>
              <h2 className="text-2xl font-semibold text-center mt-4">{car.make} {car.model}</h2>
              <p className="text-center text-gray-700">Asientos: {car.seatingCapacity}</p>
              <p className="text-center text-gray-700">Transmisión: {car.transmissionType}</p>
              <p className="text-center text-orange-600 font-bold mt-2">${car.pricePerDay}/día</p>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-xl">No se encontraron vehículos.</p>
        )}
      </div>
    </div>
  );
};

export default VehicleFleetPage;


