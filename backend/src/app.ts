import express from 'express'
import cors from 'cors'
import loginRoutes from './routes/login.js'

const app = express()

const { FRONTEND_URL } = process.env

const corsOptions = {
  origin: [`${FRONTEND_URL}`],
  methods: 'GET',
  credentials: true
}

// Middlewares
app.use(cors(corsOptions))
app.use(express.json())

app.use('/ping', (_req, res) => {
  res.send('pong')
})
app.use('/api/auth', loginRoutes)
//app.use('/api/login', loginRoutes); //nuevo commit 10

export { app }
