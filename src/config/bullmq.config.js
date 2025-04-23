import { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } from './env.config.js'

export const redisConnection = {
    host: REDIS_HOST,
    port: Number(REDIS_PORT),
    password: REDIS_PASSWORD,
    retryStrategy: (times) => {
        const delay = Math.min(Math.pow(2, times) * 1000, 30000)
        return delay
    }
}

export const defaultJobOptions = {
    removeOnComplete: { count: 10, age: 24 * 3600 },
    removeOnFail: { count: 100, age: 7 * 24 * 3600 },
    attempts: 2,
    backoff: {
        type: 'exponential',
        delay: 1000
    }
}

export function createQueueConfig(overrides = {}) {
    return {
        connection: { ...redisConnection },
        defaultJobOptions: {
            ...defaultJobOptions,
            ...overrides.defaultJobOptions
        },
        ...overrides
    }
}

