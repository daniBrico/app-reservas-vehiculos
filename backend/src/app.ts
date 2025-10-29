import express from 'express'
import cors from 'cors'
import vehicleRoutes from './routes/vehicle.routes'
import userRoutes from './routes/user.routes'
import reservationRoutes from './routes/reservation.routes'
import { authMiddleware } from './middlewares/authMiddleware'

const app = express()

const { FRONTEND_URL } = process.env

const corsOptions = {
  origin: [`${FRONTEND_URL}`],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}

// Middlewares
app.use(cors(corsOptions))
app.use(express.json())

app.use('/ping', (_req, res) => {
  res.send('pong')
})

app.use('/vehicles', vehicleRoutes)
app.use('/reservations', authMiddleware, reservationRoutes)
app.use('/api', userRoutes)

export { app }
