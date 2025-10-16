import { model, Schema } from 'mongoose'
import type { IUser } from '../../../types/types'

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  plainPassword: { type: String }, // opcional, solo para pruebas
})

const UserModel = model<IUser>('User', UserSchema)

export default UserModel
