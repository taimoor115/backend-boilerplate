import ApiError from './error.util.js'

const checkFields = (field, message) => {
    if (!field) throw new ApiError(400, message)
}

export default checkFields
