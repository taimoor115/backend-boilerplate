import { Worker } from 'bullmq'
import { redisConnection } from '../config/bullmq.config.js'
import emailWorker from './email-worker.js'

export function createWorker(queueName, processor, options = {}) {
    const worker = new Worker(queueName, processor, {
        connection: redisConnection,
        concurrency: options.concurrency || 10,
        lockDuration: options.lockDuration || 30000,
        ...options
    })

    worker.on('error', (error) => {
        console.error(`Worker for ${queueName} encountered an error:`, error)
    })

    worker.on('failed', (job, error) => {
        console.error(`Job ${job.id} in ${queueName} failed:`, error)
    })

    worker.on('completed', (job) => {
        console.log(`Job ${job.id} in ${queueName} completed successfully`)
    })

    return worker
}

// Export workers setup function for use in the main application
export function startWorkers() {
    console.log('🚀 Workers is running...')
    const workers = {}
    workers.email = createWorker('email', emailWorker, { concurrency: 1 })

    return workers
}

// Handle graceful shutdown
export async function closeAllWorkers(workers) {
    console.log('Closing all workers...')
    const closePromises = Object.values(workers).map((worker) => worker.close())
    await Promise.all(closePromises)
    console.log('All workers closed.')
}
