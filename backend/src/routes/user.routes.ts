import { Router } from 'express'
import {
  registerUser,
  loginUser,
  updateUser,
  verifyToken
} from '../controllers/user.controllers'

const router = Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.put('/update', updateUser)
router.get('/verify', verifyToken)

export default router
