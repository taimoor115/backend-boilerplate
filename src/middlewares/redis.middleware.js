import { ApiResponse } from '../utils/index.js'
import { redis } from '../instance/redis.instance.js'

export const getRedisData = (cacheKey) => async (_, res, next) => {
    if (!cacheKey) {
        return next()
    }

    const cachedData = await redis.get(cacheKey)

    if (cachedData) {
        return res.status(200).json(new ApiResponse(200, 'Category posts fetched successfully', JSON.parse(cachedData)))
    }

    next()
}
