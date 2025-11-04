import { type Response } from 'express'
import type { AuthenticatedRequest } from '../middlewares/authMiddleware'
import UserModel from '../models/mongodb/schemas/user.model'
import VehicleModel from '../models/mongodb/schemas/vehicle.model'
import ReservationModel from '../models/mongoDB/schemas/reservation.model'
import type { ReservationResponse } from '../types/types'


export const setReservation = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    console.log('Datos recibidos en la reserva:', req.body)
    console.log('Usuario autenticado:', req.user)
    // La verificación de logueo del usuario está en el middleware
    const userId = req.user?._id

    if (!userId) {
      res.status(401).json({ message: 'Credenciales invalidas' })
      return
    }

    // Verificar que el usuario exista realmente
    const userExists = await UserModel.findById(userId)
    if (!userExists) {
      res.status(404).json({ message: 'Credenciales invalidas' })
      return
    }

    // Validar datos del cuerpo
    const {
      vehicle_id,
      pickup_date,
      return_date,
      pickup_time,
      return_time,
      pickup_location,
      discount_code,
      insurance_policy_id
    } = req.body.reservation

    if (
      !vehicle_id ||
      !pickup_date ||
      !return_date ||
      !pickup_time ||
      !return_time ||
      !pickup_location
    ) {
      res.status(400).json({ message: 'Faltan datos obligatorios' })
      return
    }

    // Verificar que el vehículo exista
    const vehicleExists = await VehicleModel.findById(vehicle_id)
    if (!vehicleExists) {
      res.status(404).json({ message: 'Vehículo no encontrado' })
      return
    }

    // Crear nueva reserva
    const newReservation = new ReservationModel({
      user_id: userId,
      vehicle_id,
      pickup_date,
      return_date,
      pickup_time,
      return_time,
      pickup_location,
      discount_code: discount_code || null,
      insurance_policy_id: insurance_policy_id || null,
      status: 'pendiente'
    })

    const savedReservation = await newReservation.save()

    res.status(201).json({
      message: 'Reserva creada exitosamente',
      reservation: savedReservation
    } as ReservationResponse)
  } catch (error) {
    console.error('Error al crear la reserva:', error)
    res.status(500).json({ message: 'Error del servidor' })
  }
}


// Obtener historial de reservas del usuario logueado
export const getUserReservations = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?._id
    console.log('Buscando reservas del usuario:', userId)

    if (!userId) {
      res.status(401).json({ message: 'Usuario no autenticado' })
      return
    }

    const reservations = await ReservationModel.find({ user_id: userId })
       .populate('vehicle_id',
       'make title licencePlate year transmissionType seatingCapacity trunkCapacity pricePerDay imageURL description')
       // Info del vehículo
      .sort({ pickup_date: -1 })

    console.log('Reservas encontradas:', reservations.length)

    res.status(200).json({
      message: 'Historial de reservas obtenido correctamente',
      reservations
    })
  } catch (error) {
    console.error('Error al obtener historial de reservas:', error)
    res.status(500).json({ message: 'Error al obtener historial de reservas' })
  }
}
