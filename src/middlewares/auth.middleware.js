import { ACCESS_TOKEN_SECRET, JWT_SECRET } from '../config/env.config.js'
import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import { asyncHandler, handleError } from '../utils/index.js'
import { MESSAGES, STATUS_CODES } from '../constants/constants.js'

export const verifyJWT = (roles = ['USER']) =>
    asyncHandler(async (req, _, next) => {
        try {
            console.log('asdad')
            const token = req.header('Authorization')?.replace('Bearer ', '')
            if (!token) {
                return handleError(next, MESSAGES.UNAUTHORIZED, STATUS_CODES.UNAUTHORIZED)
            }
            const decodedToken = jwt.verify(token, JWT_SECRET)

            const user = await User.findById(decodedToken?.id).select('-password')

            if (!user) {
                return handleError(next, MESSAGES.UNAUTHORIZED, STATUS_CODES.UNAUTHORIZED)
            }            
            if (roles.includes(user?.role)) {
                req.user = user
                next()
            } else {
                return handleError(next, MESSAGES.FORBIDDEN, STATUS_CODES.FORBIDDEN)
            }
        } catch (error) {
            return handleError(next, MESSAGES.UNAUTHORIZED, STATUS_CODES.UNAUTHORIZED)
        }
    })
