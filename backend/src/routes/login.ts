// import express from 'express'
// import bcrypt from 'bcryptjs'
// import jwt from 'jsonwebtoken'
// import UserModel from '../models/mongodb/schemas/user.model.js'

// const router = express.Router()
// const SECRET = process.env.JWT_SECRET!

// router.post('/login', async (req, res) => {
//   console.log('Petición recibida en /api/auth/login:', req.body)
//   const { email, password } = req.body

//   const user = await UserModel.findOne({ email })
//   if (!user) return res.status(400).json({ error: 'Usuario no encontrado' })

//   const valid = await bcrypt.compare(password, user.password)
//   if (!valid) return res.status(401).json({ error: 'Contraseña incorrecta' })

//   const token = jwt.sign({ id: user._id, email: user.email }, SECRET, {
//     expiresIn: '2h',
//   })

//   res.json({
//     token,
//     user: { id: user._id, email: user.email, name: user.name },
//   })
// })

// export default router
