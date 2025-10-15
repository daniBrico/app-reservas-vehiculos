import bcrypt from 'bcryptjs'
import { User } from '../models/user.js'
import { connectDB } from './db.js'
import readline from 'readline'

await connectDB()

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

function question(prompt: string): Promise<string> {
  return new Promise((resolve) => rl.question(prompt, resolve))
}

const name = await question('Nombre del usuario: ')
const email = await question('Correo del usuario: ')
const password = await question('Contraseña: ')

rl.close()

const hashedPassword = await bcrypt.hash(password, 10)

await User.create({
  name,
  email,
  password: hashedPassword,
})
//se guarda una contraseña hasheada por seguridad a robo de datos pero el usuario cuando ingresa por sistema,
//ingresa la contraseña no hasheada (la que escribio por pantalla)

console.log('Usuario creado correctamente')
process.exit()
