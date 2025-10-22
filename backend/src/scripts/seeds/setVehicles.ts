import {
  closeDatabaseConnection,
  openDatabaseConnection
} from '../../models/mongodb/database'
import VehicleModel from '../../models/mongodb/schemas/vehicle.model'
import vehiclesData from '../data/vehiclesData.json'

openDatabaseConnection()
  .then(() => {
    setVehicles()
  })
  .catch((err) => {
    console.error('Error conectando a MongoDB: ', err)
  })

const setVehicles = async (): Promise<void> => {
  try {
    for (const vehicle of vehiclesData) {
      const newVehicle = new VehicleModel({
        make: vehicle.make,
        model: vehicle.model,
        transmissionType: vehicle.transmissionType,
        seatingCapacity: vehicle.seatingCapacity,
        year: vehicle.year,
        licencePlate: vehicle.licencePlate,
        pricePerDay: vehicle.pricePerDay,
        status: vehicle.status,
        image: vehicle.image,
        warrantyCost: vehicle.warrantyCost,
        description: vehicle.description
      })

      await newVehicle.save()
    }

    console.log('Vehicles loaded correctly')

    await closeDatabaseConnection()
  } catch (err) {
    console.log('Error adding vehicles: ', err)
  }
}
