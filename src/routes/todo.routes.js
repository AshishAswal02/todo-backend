import express from "express"
import {
  getTodos,
  getTodoById,
  addTodo,
  deleteTodo,
  updateTodo,
} from "../controllers/todo.controller.js"
import { verifyJWTtoken } from "../middleware/auth.middleware.js"

const router = express.Router()

router.get("/list", verifyJWTtoken, getTodos)
router.get("/list/:id", verifyJWTtoken, getTodoById)
router.post("/add",verifyJWTtoken, addTodo)
router.delete("/delete/:id",verifyJWTtoken, deleteTodo)
router.put("/update/:id",verifyJWTtoken, updateTodo)

export default router
