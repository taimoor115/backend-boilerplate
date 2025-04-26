// Import all routes here and use them in the app
// routes/index.js
import express from 'express'
import userRoute from "./user.route.js"
const router = express.Router()


router.use('/users', userRoute)

export default router
