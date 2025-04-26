export const DB_NAME = 'nutrivision'
export const POST_CONFIG = {
    BATCH_SIZE: 3,
    MAX_IMAGES: 10,
    MIN_IMAGES: 1,
    ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
    MAX_FILE_SIZE: 5 * 1024 * 1024
}

export const AUTH_CONSTANTS = {
    OTP_EXPIRY: 2 * 60 * 1000,
    OTP_LENGTH: 6,
    OTP_MIN: 100000,
    OTP_MAX: 999999,
    RATE_LIMIT_MINUTES: 2,
    EMAIL_REGEX: /^\S+@\S+\.\S+$/
}

export const STATUS_CODES = {
    SUCCESS: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
    SERVICE_UNAVAILABLE: 503
}

export const MESSAGES = {
    SUCCESS: 'Success',
    ERROR: 'An error occurred, please try again later',
    NOT_FOUND: 'Resource not found',
    UNAUTHORIZED: 'You are not authorized to perform this action',
    FORBIDDEN: 'Access to this resource is forbidden',
    VALIDATION_ERROR: 'There was a validation error with your request',
    UPLOAD_ERROR: 'There was a problem uploading the file',
    CREATION_ERROR: 'There was a problem creating the resource',
    UPDATE_ERROR: 'There was a problem updating the resource',
    DELETION_ERROR: 'There was a problem deleting the resource',
    INVALID_CREDENTIALS: 'Invalid email or password',
    ALREADY_EXISTS: 'Already exists'
}

export const ROLES = {
    ADMIN: 'ADMIN',
    USER: 'USER',
    DOCTOR: 'DOCTOR'
}
