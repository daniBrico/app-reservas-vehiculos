import { type Request, type Response } from 'express'
import VehicleModel from '../models/mongodb/schemas/vehicle.model'

export const getVehicles = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const vehicles = await VehicleModel.find()

    if (vehicles.length === 0) {
      res.status(404).json({ message: 'No vehicles found' })
      return
    }

    res.json(vehicles)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message })
    } else {
      res.status(500).json({ message: 'An unknown error occurred' })
    }
  }
}
