//nuevo commit 10 (TODO EL ARCHIVO)

import express from "express";
import jwt from "jsonwebtoken"; //instale esta dependencia (commit 10)
import bcrypt from "bcryptjs"; //instale esta dependencia (commit 10)
//import { db } from "../db"; // para acceder a la base
const router = express.Router();

const SECRET = "clave_super_secreta"; // ponelo en .env

// LOGIN
/*router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  
  const user = await db.get("SELECT * FROM usuarios WHERE email = ?", [email]);
  if (!user) return res.status(400).json({ error: "Usuario no encontrado" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: "Contraseña incorrecta" });

  const token = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: "2h" });
  res.json({ token });
});

export default router;
*/