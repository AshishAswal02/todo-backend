import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import authRoutes from './src/routes/auth.routes.js'
import todoRoutes from "./src/routes/todo.routes.js"


const app = express()

app.use(express.json())
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }))
app.use(cookieParser())

app.get("/", (_, res) => {
  res.json({ status: "OK" })
})

app.use(authRoutes)
app.use(todoRoutes)

app.listen(3000)
