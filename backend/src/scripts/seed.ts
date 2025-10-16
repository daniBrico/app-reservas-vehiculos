import bcrypt from 'bcryptjs'
import readline from 'readline'
import UserModel from '../models/mongodb/schemas/user.model'
import { openDatabaseConnection } from '../models/mongodb/database.js'

openDatabaseConnection()

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

await UserModel.create({
  name,
  email,
  password: hashedPassword,
})
//se guarda una contraseña hasheada por seguridad a robo de datos pero el usuario cuando ingresa por sistema,
//ingresa la contraseña no hasheada (la que escribio por pantalla)

console.log('Usuario creado correctamente')
process.exit()
