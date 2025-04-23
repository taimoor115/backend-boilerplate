import ApiError from './error.util.js'
import ApiResponse from './response.util.js'

const sendResponse = (res, statusCode, message, data = {}) => {
    return res.status(statusCode).json(new ApiResponse(statusCode, message, data))
}

const handleError = (next, errorMessage, statusCode) => {
    return next(new ApiError(statusCode, errorMessage))
}

export { sendResponse, handleError }
