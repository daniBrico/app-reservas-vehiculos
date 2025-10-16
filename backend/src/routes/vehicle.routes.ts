import { Router } from 'express'
import { getVehicles } from '../controllers/vehicle.controllers'

const router = Router()

router.get('/', getVehicles)

export default router
