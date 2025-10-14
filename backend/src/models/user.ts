import mongoose, { Document } from "mongoose";

// Interfaz opcional para TypeScript
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Colección en MongoDB se llamará 'users' automáticamente
export const User = mongoose.model<IUser>("User", userSchema);
