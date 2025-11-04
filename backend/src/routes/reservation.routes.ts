import express from 'express'
import { setReservation, getUserReservations } from '../controllers/reservation.controllers'
import { authMiddleware } from '../middlewares/authMiddleware'

const router = express.Router()

// Crear una reserva
router.post('/', authMiddleware, setReservation)

// Obtener historial de reservas del usuario logueado
router.get('/historial', authMiddleware, getUserReservations)

export default router
