import { app } from './app.js'
import connectDB from './src/config/db.config.js'

connectDB()
    .then(() => {
        app.listen(7000, () => {
            console.warn(`⚙️ Server is running on port ${process.env.PORT}`)
        })
    })
    .catch((err) => {
        console.log('PostgreSQL connection failed!', err)
    })