import jwt from "jsonwebtoken"
import "dotenv/config"

export const signToken = (payload) =>
  jwt.sign(payload, process.env.SECRET, { expiresIn: "1d" })
