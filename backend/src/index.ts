import express from "express";
import { createServer } from 'node:http'
//import { app } from './app.js' //lo comente por tema de la linea 10 "export const app = express();"
import { connectDB } from "./db.js";       // importe db.ts
import loginRoutes from './routes/login.js'; //nuevo commit 10

// Se tiene que conectar a MongoDB antes de levantar el servidor
await connectDB();

export const app = express();
app.use(express.json());

app.use('/api/auth', loginRoutes); //nuevo commit 10

const port = process.env.PORT ?? 3000

//app.use('/api/login', loginRoutes); //nuevo commit 10
const server = createServer(app)

server.listen(port, () => {
  console.log(`server running on port http://localhost:${port}`)
})
