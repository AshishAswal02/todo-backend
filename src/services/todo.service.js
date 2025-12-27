import { ObjectId } from "mongodb"
import { connection } from "../config/db.js"
import { COLLECTIONS } from "../constants/collections.js"

export const getTodosService = async () => {
  const db = await connection()
  return db.collection(COLLECTIONS.TODOS).find().toArray()
}

export const getTodoByIdService = async (id) => {
  const db = await connection()
  return db.collection(COLLECTIONS.TODOS).findOne({
    _id: new ObjectId(id),
  })
}

export const addTodoService = async (payload) => {
  const db = await connection()
  return db.collection(COLLECTIONS.TODOS).insertOne(payload)
}

export const deleteTodoService = async (id) => {
  const db = await connection()
  return db.collection(COLLECTIONS.TODOS).deleteOne({
    _id: new ObjectId(id),
  })
}

export const updateTodoService = async (id, updateData) => {
  const { _id, ...data } = updateData

  const db = await connection()
  return db.collection(COLLECTIONS.TODOS).updateOne(
    { _id: new ObjectId(id) },
    { $set: data }
  )
}
