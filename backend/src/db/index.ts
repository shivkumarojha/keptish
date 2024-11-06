import mongoose from "mongoose"
import { DB_NAME } from "../constants"

async function connectDb() {
    try {
        const connectionInstance = await mongoose.connect(`mongodb://localhost:27017/${DB_NAME}`)
        console.log("Mongo Db connected")
        console.log("Connection Instance host", connectionInstance.connection.host)

    } catch (error) {
        console.log("Mongo DB connection failed", error)
        throw error
    }
}


export default connectDb