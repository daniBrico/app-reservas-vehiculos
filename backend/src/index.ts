import { createServer } from 'node:http'
import { app } from './app.js'
//import loginRoutes from './login.js'; //nuevo commit 10


const port = process.env.PORT ?? 3000

//app.use('/api/login', loginRoutes); //nuevo commit 10
const server = createServer(app)

server.listen(port, () => {
  console.log(`server running on port http://localhost:${port}`)
})
