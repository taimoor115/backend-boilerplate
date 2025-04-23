export const adLiveNotificationTemplate = (userName) => {
    return `
        <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; border-radius: 8px; border: 1px solid #e0e0e0;">
            <h2 style="color: #4CAF50;">🎉 Congratulations ${userName}!</h2>
            <p style="font-size: 16px;">Your ad is now live! 🌟</p>
            <p style="font-size: 16px;">The Pettrify team is excited to have you on board!</p>
            <p style="font-size: 16px;">Thank you for using our service! If you have any questions, feel free to reach out.</p>
        </div>
    `
}

export const invoiceEmailTemplate = (userName, amount, category, date) => {
    const invoiceNumber = `INV-${Date.now()}`
    return `
        <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 40px; background-color: white;">
            <!-- Header Section -->
            <div style="display: flex; justify-content: space-between; margin-bottom: 40px;">
                <div>
                    <h1 style="color: #4CAF50; margin: 0;">PETTRIFY</h1>
                  
                    <p style="color: #666; margin: 5px 0;">contact@pettrify.com</p>
                </div>
                <div style="text-align: right;">
                    <h2 style="color: #333; margin: 0;">INVOICE</h2>
                    <p style="color: #666; margin: 5px 0;">Invoice #: ${invoiceNumber}</p>
                    <p style="color: #666; margin: 5px 0;">Date: ${new Date(date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}</p>
                </div>
            </div>

            <!-- Client Information -->
            <div style="margin-bottom: 40px; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
                <h3 style="color: #333; margin: 0 0 10px 0;">BILLED TO</h3>
                <p style="margin: 5px 0;"><strong>${userName}</strong></p>
            </div>

            <!-- Invoice Details -->
            <div style="margin-bottom: 40px;">
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr style="background-color: #4CAF50; color: white;">
                            <th style="padding: 12px; text-align: left;">DESCRIPTION</th>
                            <th style="padding: 12px; text-align: center;">CATEGORY</th>
                            <th style="padding: 12px; text-align: right;">AMOUNT</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="border-bottom: 1px solid #eee;">
                            <td style="padding: 12px;">Pet Advertisement Subscription</td>
                            <td style="padding: 12px; text-align: center;">${category}</td>
                            <td style="padding: 12px; text-align: right;">Rs.${amount}</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr style="background-color: #f9f9f9;">
                            <td colspan="2" style="padding: 12px; text-align: right;"><strong>Total</strong></td>
                            <td style="padding: 12px; text-align: right;"><strong>Rs.${amount}</strong></td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            <!-- Payment Status -->
            <div style="margin-bottom: 40px; text-align: center;">
                <div style="display: inline-block; background-color: #4CAF50; color: white; padding: 10px 20px; border-radius: 4px;">
                    PAID
                </div>
            </div>

            <!-- Terms and Notes -->
            <div style="margin-bottom: 40px; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
                <h3 style="color: #333; margin: 0 0 10px 0;">TERMS & NOTES</h3>
                <p style="margin: 5px 0;">• Payment has been processed successfully</p>
                <p style="margin: 5px 0;">• This subscription is valid for the duration specified in your chosen plan</p>
                <p style="margin: 5px 0;">• For any queries, please contact our support team</p>
            </div>

            <!-- Footer -->
            <div style="text-align: center; color: #666; font-size: 14px; margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee;">
                <p style="margin: 5px 0;">Thank you for choosing Pettrify!</p>
                <p style="margin: 5px 0;">For any questions, please contact us at support@pettrify.com</p>
                <p style="margin: 5px 0;">© ${new Date().getFullYear()} Pettrify. All rights reserved.</p>
            </div>
        </div>
    `
}

export const passwordResetTemplate = (otp) => {
    return `
        <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; border-radius: 8px; border: 1px solid #e0e0e0; max-width: 600px; margin: 0 auto;">
            <!-- Header -->
            <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color: #4CAF50; margin: 0;">PETTRIFY</h1>
                <h2 style="color: #333; margin-top: 20px;">Password Reset Request</h2>
            </div>

            <!-- Greeting -->
            <div style="margin-bottom: 30px;">
                
                <p style="font-size: 16px; color: #333;">We received a request to reset your password. Here's your one-time password (OTP):</p>
            </div>

            <!-- OTP Display -->
            <div style="text-align: center; margin: 30px 0;">
                <div style="background-color: #4CAF50; color: white; padding: 15px 25px; border-radius: 8px; font-size: 24px; letter-spacing: 5px; display: inline-block;">
                    ${otp}
                </div>
                <p style="color: #666; margin-top: 15px; font-size: 14px;">This OTP will expire in 2 minutes</p>
            </div>

            <!-- Security Notice -->
            <div style="background-color: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p style="color: #856404; margin: 0; font-size: 14px;">
                    🔒 If you didn't request this password reset, please ignore this email or contact our support team immediately.
                </p>
            </div>

            <!-- Footer -->
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                <p style="color: #666; font-size: 14px; margin: 5px 0;">Need help? Contact us at support@pettrify.com</p>
                <p style="color: #666; font-size: 14px; margin: 5px 0;">© ${new Date().getFullYear()} Pettrify. All rights reserved.</p>
            </div>
        </div>
    `
}

export const doctorSelectionNotificationTemplate = (doctorName, email, password) => {
    return `
        <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px; border-radius: 8px; border: 1px solid #e0e0e0; max-width: 600px; margin: 0 auto;">
            <!-- Header -->
            <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="color:rgb(0, 0, 0); margin: 0;">PETTRIFY</h1>
                <h2 style="color: #333; margin-top: 20px;">Congratulations ${doctorName}!</h2>
            </div>

            <!-- Greeting -->
            <div style="margin-bottom: 30px;">
                <p style="font-size: 16px; color: #333;">We are thrilled to inform you that you have been selected to join the Pettrify team as a doctor!</p>
                <p style="font-size: 16px; color: #333;">Here are your credentials:</p>
            </div>

            <!-- Credentials Display -->
            <div style="margin-bottom: 30px;">
                <p style="font-size: 16px; color: #333;"><strong>Email:</strong> ${email}</p>
                <p style="font-size: 16px; color: #333;"><strong>Password:</strong> ${password}</p>
            </div>

            <!-- Next Steps -->
            <div style="margin-bottom: 30px;">
                <p style="font-size: 16px; color: #333;">Please log in to your account. We are excited to have you on board and look forward to working together to provide the best care for our clients.</p>
            </div>

            <!-- Footer -->
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                <p style="color: #666; font-size: 14px; margin: 5px 0;">Need help? Contact us at support@pettrify.com</p>
                <p style="color: #666; font-size: 14px; margin: 5px 0;">© ${new Date().getFullYear()} Pettrify. All rights reserved.</p>
            </div>
        </div>
    `
}
