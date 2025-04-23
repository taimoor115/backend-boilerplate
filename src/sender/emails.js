import { adLiveNotificationTemplate, doctorSelectionNotificationTemplate, invoiceEmailTemplate, passwordResetTemplate } from './emailTemplates.js'
import { sendMail, transporter } from './index.js'
export const sendAdLiveNotification = async (email, userName) => {
    const subject = 'Your Ad is Live Now! 🎉'
    const htmlContent = adLiveNotificationTemplate(userName)

    try {
        await sendMail(transporter, email, subject, htmlContent)
    } catch (error) {
        console.error('Error while sending ad live notification email', error)
    }
}

export const sendInvoiceEmail = async (email, userName, amount, category, date) => {
    const subject = 'Your Pettrify Invoice 📋'
    const htmlContent = invoiceEmailTemplate(userName, amount, category, date)

    try {
        await sendMail(transporter, email, subject, htmlContent)
        console.log('Invoice email sent successfully')
    } catch (error) {
        console.error('Error while sending invoice email:', error)
        throw error
    }
}

export const sendPasswordResetEmail = async (email, otp) => {
    const subject = 'Password Reset - Pettrify 🔐'
    const htmlContent = passwordResetTemplate(otp)

    try {
        await sendMail(transporter, email, subject, htmlContent)
        console.log('Password reset email sent successfully')
    } catch (error) {
        console.error('Error while sending password reset email:', error)
        throw error
    }
}

export const sendDoctorSelectionEmail = async (email, userName, password) => {
    const subject = 'Doctor Selection - Pettrify 🩺'
    const htmlContent = doctorSelectionNotificationTemplate(userName, email, password)

    try {
        await sendMail(transporter, email, subject, htmlContent)
        console.log('Doctor selection email sent successfully')
    } catch (error) {
        console.error('Error while sending doctor selection email:', error)
        throw error
    }
}
