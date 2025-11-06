import express from 'express'
import {
  setReservation,
  getReservations
} from '../controllers/reservation.controllers'
import { authMiddleware } from '../middlewares/authMiddleware'

const router = express.Router()

router.post('/', authMiddleware, setReservation)

router.get('/', authMiddleware, getReservations)

export default router
