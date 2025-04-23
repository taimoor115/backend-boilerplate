import Redis from 'ioredis'
import { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } from './env.config.js'

class RedisClient {
    constructor() {
        this.redis = null
        this.options = {
            host: REDIS_HOST,
            port: REDIS_PORT,
            password: REDIS_PASSWORD,
            retryStrategy: (times) => {
                const delay = Math.min(times * 50, 2000)
                return delay
            },
            maxRetriesPerRequest: 3,
            enableReadyCheck: true,
            showFriendlyErrorStack: process.env.NODE_ENV !== 'production'
        }
    }

    connect() {
        try {
            this.redis = new Redis(this.options)

            this.redis.on('connect', () => {
                console.info('✅ Redis client connected')
            })

            this.redis.on('error', (err) => {
                console.error('❌ Redis client error:', err)
        })

            this.redis.on('ready', () => {
                console.info('✅ Redis client ready')
            })

            this.redis.on('close', () => {
                console.warn('⚠️ Redis client connection closed')
            })

            this.redis.on('reconnecting', () => {
                console.info('🔄 Redis client reconnecting')
            })

            return this.redis
        } catch (error) {
            console.error('❌ Redis connection error:', error)
            throw error
        }
    }

    getInstance() {
        if (!this.redis) {
            this.connect()
        }
        return this.redis
    }

    async disconnect() {
        if (this.redis) {
            await this.redis.quit()
            this.redis = null
            console.info('👋 Redis client disconnected')
        }
    }
}

const redisClient = new RedisClient()
export default redisClient
