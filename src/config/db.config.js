import mongoose from 'mongoose'
import { DB_NAME } from '../constants/constants.js'
import { MONGO_URL } from './env.config.js'
import dotenv from 'dotenv'
dotenv.config({
    path: './.env'
})

const connectDB = async () => {
try {
        const connectionInstance = await mongoose.connect(`${MONGO_URL}/${DB_NAME}`)

        console.warn(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`)

        return `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    } catch (error) {
        console.log('MONGODB connection FAILED ', error)
        'MONGODB connection FAILED ', error

        process.exit(1)
    }
}

export default connectDB
