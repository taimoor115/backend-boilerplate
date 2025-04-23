import User from '../models/user.model.js'

export const generateToken = async (id, rememberMe) => {
    try {
        const user = await User.findById(id)

        if (!rememberMe) {
            const accessToken = user.generateAccessTokenWithLongDuration()
            user.accessToken = accessToken
            await user.save({ validateBeforeSave: false })
            return { accessToken }
        }
        const accessToken = user.generateAccessToken()
        user.accessToken = accessToken

        await user.save({ validateBeforeSave: false })
        return { accessToken }
    } catch (error) {
        console.error(error)
    }
}
