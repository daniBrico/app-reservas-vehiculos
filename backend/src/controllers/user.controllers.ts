import { type Request, type Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import UserModel from '../models/mongodb/schemas/user.model'
import type { IUser } from '../types/types'
import { createAccessToken } from '../utils/jwt'

// Registro de usuario
export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      email,
      password,
      full_name,
      last_name,
      country,
      address,
      address_number,
      phone_number,
      fiscal_condition,
      document_type,
      document_number
    } = req.body.user as IUser

    if (
      !email ||
      !password ||
      !full_name ||
      !last_name ||
      !country ||
      !address ||
      !address_number ||
      !phone_number ||
      !fiscal_condition ||
      !document_type ||
      !document_number
    ) {
      res.status(400).json({ message: 'Campos obligatorios faltantes' })
      return
    }

    const existingUser = await UserModel.findOne({ email })
    if (existingUser) {
      res.status(400).json({ message: 'El correo ya está registrado' })
      return
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await UserModel.create({
      email,
      password: hashedPassword,
      full_name,
      last_name,
      country,
      address,
      address_number,
      phone_number,
      fiscal_condition,
      document_type,
      document_number
    })

    const userObj = newUser.toObject()

    const token = await createAccessToken({
      _id: userObj._id,
      email: userObj.email,
      full_name: userObj.full_name
    })

    res.cookie('token', token)

    res.status(201).json({
      message: 'Usuario creado correctamente',
      userLoginInfo: {
        id: userObj._id,
        full_name: userObj.full_name,
        email: userObj.email
      }
    })
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : 'Error desconocido'
    })
  }
}

// Login de usuario
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      res.status(400).json({ message: 'Credenciales invalidas' })
      return
    }

    const userFounded = await UserModel.findOne({ email })
    if (userFounded === null) {
      res.status(401).json({ message: 'Credenciales invalidas' })
      return
    }

    const isMatch = await bcrypt.compare(password, userFounded.password)
    if (!isMatch) {
      res.status(401).json({ message: 'Correo o contraseña incorrectos' })
      return
    }

    const token = jwt.sign(
      {
        _id: userFounded._id,
        email: userFounded.email,
        full_name: userFounded.full_name
      },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    )

    res.status(200).json({
      message: 'Login exitoso',
      token
    })
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : 'Error desconocido'
    })
  }
}

//Modificar usuario
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { email, current_password, new_password, ...updates } = req.body

    const user = await UserModel.findOne({ email })
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' })

    // Cambio de contraseña
    if (new_password) {
      if (!current_password) {
        return res
          .status(400)
          .json({ message: 'Debe ingresar la contraseña actual' })
      }

      const isMatch = await bcrypt.compare(current_password, user.password)
      if (!isMatch) {
        return res.status(401).json({ message: 'Contraseña actual incorrecta' })
      }

      updates.password = await bcrypt.hash(new_password, 10)
    }

    const updatedUser = await UserModel.findOneAndUpdate({ email }, updates, {
      new: true
    })

    res.json({
      message: 'Usuario actualizado correctamente',
      user: {
        id: updatedUser!._id,
        full_name: updatedUser!.full_name,
        email: updatedUser!.email,
        last_name: updatedUser!.last_name,
        country: updatedUser!.country,
        address: updatedUser!.address,
        address_number: updatedUser!.address_number,
        phone_number: updatedUser!.phone_number,
        fiscal_condition: updatedUser!.fiscal_condition,
        document_type: updatedUser!.document_type,
        document_number: updatedUser!.document_number
      }
    })
  } catch (err: any) {
    res.status(500).json({ message: err.message || 'Error desconocido' })
  }
}
