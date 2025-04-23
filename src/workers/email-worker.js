import { adLiveNotificationTemplate } from '../sender/emailTemplates.js'
import { sendMail, transporter } from '../sender/index.js'

export default async function emailWorker(job) {
    const { type, email, userName } = job.data

    switch (type) {
        case 'adLiveNotification':
            await sendMail(transporter, email, 'Your Ad is Live Now! 🎉', adLiveNotificationTemplate(userName))
            break
        default:
            throw new Error(`Unknown email job type: ${type}`)
    }
}
