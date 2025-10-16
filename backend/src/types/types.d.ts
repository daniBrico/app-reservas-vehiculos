// Modelos de MongoDB
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

export interface IUser extends Document {
  email: string
  password: string
  full_name: string
  last_name: string
  country: string
  address: string
  address_number: number
  phone_number: number
  fiscal_condition: string
  document_type: string
  document_number: number
}
