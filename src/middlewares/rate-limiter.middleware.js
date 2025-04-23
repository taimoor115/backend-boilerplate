import rateLimit from 'express-rate-limit'

const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 3,
    message: 'Too many requests, try again later.'
})

export default rateLimiter
