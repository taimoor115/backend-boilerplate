import nodemailer from 'nodemailer'
import { EMAIL, PASSWORD } from '../config/env.config.js'

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.email',
    port: 587,
    secure: false,
    auth: {
        user: EMAIL,
        pass: PASSWORD
    }
})
export const sendMail = async (transporter, email, subject, html) => {
    try {
        await transporter.sendMail({
            from: {
                name: 'PETRIFFY',
                address: EMAIL
            },
            to: email,
            subject,
            html
        })
        console.warn('email send successfull')
    } catch (error) {
        console.error(error)
    }
}
