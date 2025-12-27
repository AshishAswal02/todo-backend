import { MongoClient } from "mongodb"
import "dotenv/config"

const url = process.env.MONGO_URL
const dbName = "node-project"

export const collectionName = "todo"

const client = new MongoClient(url)

let db
export const connection = async () => {
  if (db) return db

  try {
    const connect = await client.connect()
    db = connect.db(dbName)
    console.log("--MongoDB connected--")
    return db
  } catch (error) {
    console.error(error)
    throw error
  }
}
