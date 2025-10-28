// Modelos de MongoDB
export interface IVehicle extends Document {
  _id: Schema.Types.ObjectId
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

// User types
export type EmailType = string
export type PasswordType = string
export type FullName = string

export interface IUser extends Document {
  email: EmailType
  password: PasswordType
  full_name: FullName
  last_name: string
  country: string
  address: string
  address_number: number
  phone_number: number
  fiscal_condition: string
  document_type: string
  document_number: number
}

// Login types
interface UserInfo {
  _id: Schema.Types.ObjectId
  email: EmailType
  full_name: string
}

interface LoginResponse {
  token: string
  userInfo: UserInfo
}
