import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import morgan from 'morgan'
import { ALLOWED_ORIGINS } from './src/config/env.config.js'
import router from './src/routes/index.js'
import ApiError from './src/utils/error.util.js'

const app = express()

app.use(morgan('dev'))

app.use(express.json({ limit: '16kb' }))
app.use(express.urlencoded({ extended: true, limit: '16kb' }))
app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || ALLOWED_ORIGINS.includes(origin)) {
                callback(null, true)
            } else {
                callback(new Error('Not allowed by CORS'))
            }
        },
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        credentials: true
    })
)

app.use(
    compression({
        level: 6
    })
)

// app.get("/send", async (req, res) => {
//   await sendNoticationWithQueue('taimoorhussain985@gmail.com', 'Test User')
//   res.send('Email sent successfully')
// })

app.use(cookieParser())

app.get('/', (req, res) => {
    res.send('Server is running')
})

app.use(express.static('public'))
app.use('/api/v1', router)
// app.use('/api', swaggerServe, swaggerSetup)

app.all('*', (req, res, next) => {
    return next(new ApiError(404, 'Page not found'))
})

app.use((err, req, res, next) => {
    const { statusCode = 500, message = 'Something went wrong' } = err

    res.status(statusCode).json({ error: message, success: false })
})

export { app }

