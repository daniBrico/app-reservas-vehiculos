export interface IVehicle extends Document {
  make: string
  model: string
  year: number
  licencePlate: string
  pricePerDay: number
  status: string
  image: string
  warrantyCost: number
  insurancePolicyID: Schema.Types.ObjectId[]
}
