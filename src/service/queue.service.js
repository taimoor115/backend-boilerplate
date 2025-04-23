import { QueueEvents } from 'bullmq'
import { redisConnection } from '../config/bullmq.config.js'

export class QueueService {
    constructor(queue, options = {}) {
        this.queue = queue
        this.events = new QueueEvents(queue.name, { connection: redisConnection })
        this.setupEvents()
        this.options = options
    }

    async addJob(data, options = {}) {
        const jobOptions = {
            ...this.options,
            ...options
        }
       
        return this.queue.add(options.name || 'default', data, jobOptions)
    }
    async scheduleJob(data, delay, options = {}) {
        const jobOptions = {
            ...this.options,
            ...options
        }

        if (delay instanceof Date) {
            jobOptions.delay = delay.getTime() - Date.now()
        } else {
            jobOptions.delay = delay
        }

        return this.addJob(data, jobOptions)
    }

    async addCronJob(data, cronPattern, options = {}) {
        const jobOptions = {
            ...this.options,
            ...options,
            repeat: {
                pattern: cronPattern,
                ...options.repeat
            }
        }

        return this.addJob(data, jobOptions)
    }

    async getJob(jobId) {
        return this.queue.getJob(jobId)
    }

    async getJobCounts() {
        return this.queue.getJobCounts('active', 'completed', 'failed', 'delayed', 'waiting')
    }

    setupEvents() {
        this.events.on('completed', ({ jobId, returnvalue }) => {
            if (this.options.onCompleted) {
                this.options.onCompleted(jobId, JSON.parse(returnvalue))
            }
        })

        this.events.on('failed', ({ jobId, failedReason }) => {
            if (this.options.onFailed) {
                this.options.onFailed(jobId, failedReason)
            }
        })
    }
}
