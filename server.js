import connectDB from './src/config/db.config.js'
import redisClient from './src/config/redis.config.js'
import { app } from './app.js'

connectDB()
    .then(() => {
        redisClient.connect()

        app.listen(process.env.PORT || 7000, () => {
            console.warn(`⚙️ Server is running on port ${process.env.PORT}`)
        })
    })
    .catch((err) => {
        console.log('PostgreSQL connection failed!', err)
    })

process.on('SIGTERM', async () => {
    await redisClient.disconnect()
})

process.on('SIGINT', async () => {
    await redisClient.disconnect()
})
