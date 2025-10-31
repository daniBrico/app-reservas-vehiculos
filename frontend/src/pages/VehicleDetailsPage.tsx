import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getVehicleById } from "../api/vehicleApi";
import type { IVehicle } from "../types/types";

const VehicleDetailsPage = () => {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState<IVehicle | null>(null);

  useEffect(() => {
    if (id) {
      getVehicleById(id).then(setVehicle);
    }
  }, [id]);

  if (!vehicle) return <p className="text-center mt-20 text-lg">Cargando...</p>;

  return (
    <div className="min-h-screen bg-white p-10 max-w-4xl mx-auto text-black">
      <h1 className="text-3xl font-bold mb-6 text-center">
        {vehicle.make} {vehicle.model}
      </h1>

      <div className="flex flex-col md:flex-row items-center gap-10">
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={vehicle.image}
            alt={vehicle.model}
            className="max-h-64 object-contain transition-transform duration-500 hover:scale-110"
          />
        </div>

        <div className="w-full md:w-1/2 space-y-3">
          <p><strong>Año:</strong> {vehicle.year}</p>
          <p><strong>Transmisión:</strong> {vehicle.transmissionType}</p>
          <p><strong>Asientos:</strong> {vehicle.seatingCapacity}</p>
          <p><strong>Garantía:</strong> ARS ${vehicle.warrantyCost}</p>
          <p><strong>Descripción:</strong> {vehicle.description}</p>

          <p className="text-orange-600 text-2xl font-bold mt-4">
            ARS ${vehicle.pricePerDay}/día
          </p>

          <button className="mt-6 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition">
            Reservar ahora
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetailsPage;