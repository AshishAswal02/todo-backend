import { connection } from "../config/db.js"
import { COLLECTIONS } from "../constants/collections.js"

export const findUserByEmail = async (email) => {
  const db = await connection()
  return db.collection(COLLECTIONS.USERS).findOne({ email })
}

export const createUser = async (user) => {
  const db = await connection()
  return db.collection(COLLECTIONS.USERS).insertOne(user)
}

export const validateUser = async ({ email, password }) => {
  const db = await connection()
  return db.collection(COLLECTIONS.USERS).findOne({ email, password })
}
