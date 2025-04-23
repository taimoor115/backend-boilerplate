import { app } from './app.js'
import connectDB from './src/config/db.config.js'
import redisClient from './src/config/redis.config.js'
import { closeAllWorkers, startWorkers } from './src/workers/workers.js'

let workers
connectDB()
    .then(() => {
        redisClient.connect()
        workers = startWorkers()
        app.listen(process.env.PORT || 7000, () => {
            console.warn(`⚙️ Server is running on port ${process.env.PORT}`)
        })
    })
    .catch((err) => {
        console.log('PostgreSQL connection failed!', err)
    })

process.on('SIGTERM', async () => {
    await closeAllWorkers(workers)
    await closeAllQueues()
    await redisClient.disconnect()
})

process.on('SIGINT', async () => {
    await closeAllWorkers(workers)
    await closeAllQueues()
    await redisClient.disconnect()
})
