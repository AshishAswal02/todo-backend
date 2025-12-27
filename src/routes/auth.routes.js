import express from 'express'
import { login, logout, signup } from '../controllers/auth.controller.js'
import { verifyJWTtoken } from '../middleware/auth.middleware.js'

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)
router.get("/me", verifyJWTtoken, (_, res) => res.sendStatus(200))

export default router