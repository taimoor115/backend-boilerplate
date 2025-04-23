import { emailQueue } from '../queues/index.js'
import { QueueService } from '../service/queue.service.js'

export const emailQueueInstance = new QueueService(emailQueue)
