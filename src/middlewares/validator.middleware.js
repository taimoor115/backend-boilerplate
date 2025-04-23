import { userValidationSchema } from '../schema/schema.js'
import { addValidation } from '../utils/index.js'

export const registerValidator = (req, _, next) => addValidation(req, _, next, userValidationSchema)
