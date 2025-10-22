import { Schema, model } from 'mongoose'
import type { IVehicle } from '../../../types/types'

const VehicleSchema = new Schema<IVehicle>({
  make: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  licencePlate: {
    type: String,
    required: true
  },
  pricePerDay: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  warrantyCost: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  }
})

const VehicleModel = model<IVehicle>('Vehicle', VehicleSchema)

export default VehicleModel
