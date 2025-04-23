import { Queue } from 'bullmq'
import { createQueueConfig } from '../config/bullmq.config.js'

export const emailQueue = new Queue(
    'email',
    createQueueConfig({
        defaultJobOptions: {
            priority: 2
        }
    })
)

export async function closeAllQueues() {
    console.log('Closing all queues...')
    await Promise.all([emailQueue.close()])
    console.log('All queues closed.')
}

