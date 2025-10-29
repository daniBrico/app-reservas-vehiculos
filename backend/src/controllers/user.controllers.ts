import { type Request, type Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import UserModel from '../models/mongodb/schemas/user.model'
import type { IUser } from '../types/types'

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
    } = req.body as IUser

    if (!email || !password || !full_name) {
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

    res.status(201).json({
      message: 'Usuario creado correctamente',
      user: {
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
