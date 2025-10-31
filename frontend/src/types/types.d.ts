// Modelos de MongoDB
export interface IVehicle extends Document {
  _id: Schema.Types.ObjectId
  title: string
  transmissionType: string
  seatingCapacity: number
  trunkCapacity: number
  year: number
  licencePlate: string
  pricePerDay: number
  status: string
  imageURL: string
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

export interface IReservation extends Document {
  _id?: Schema.Types.ObjectId
  user_id: string
  vehicle_id: Schema.Types.ObjectId
  pickup_date: Date
  return_date: Date
  pickup_time: string
  return_time: string
  status: string | undefined
  pickup_location: string
  discount_code?: string
  insurance_policy_id?: Schema.Types.ObjectId | null
}

// Login types
export interface UserInfo {
  _id: Schema.Types.ObjectId
  email: EmailType
  full_name: string
}

export interface TokenPayload {
  _id: string
  email: EmailType
  full_name: string
}

export interface LoginResponse {
  token: string
}

// Response
export interface LoginResponse {
  token: string
}

export interface ReservationResponse {
  message: string
  reservation: IReservation
}
