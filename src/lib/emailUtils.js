import nodemailer from 'nodemailer'
import crypto from 'crypto'

// Create a transporter using Gmail SMTP
const createTransporter = () => {
  const user = process.env.GMAIL_USER
  const pass = process.env.GMAIL_APP_PASSWORD

  if (!user || !pass) {
    throw new Error('Gmail credentials are not configured. Please set GMAIL_USER and GMAIL_APP_PASSWORD in your environment variables.')
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass }
  })
}

// Generate a verification token
export function generateVerificationToken() {
  return crypto.randomBytes(32).toString('hex')
}

// Verify transporter configuration
export const verifyEmailConfig = async () => {
  try {
    const transporter = createTransporter()
    const verification = await transporter.verify()
    console.log('Email configuration is valid:', verification)
    return true
  } catch (error) {
    console.error('Email configuration error:', error)
    return false
  }
}

// Send verification email
export async function sendVerificationEmail(email, token) {
  try {
    if (!process.env.NEXT_PUBLIC_APP_URL) {
      throw new Error('NEXT_PUBLIC_APP_URL is not configured in environment variables')
    }

    const transporter = createTransporter()
    const verificationLink = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`

    const mailOptions = {
      from: {
        name: 'LegionFlyFF',
        address: process.env.GMAIL_USER
      },
      to: email,
      subject: 'Verify Your LegionFlyFF Account',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Verify Your LegionFlyFF Account</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="min-width: 100%; background-color: #f4f4f4;">
            <tr>
              <td align="center" style="padding: 40px 0;">
                <table role="presentation" style="width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                  <!-- Header with Logo -->
                  <tr>
                    <td align="center" style="padding: 40px 0; background-color: #1a1a1a;">
                      <img src="${process.env.NEXT_PUBLIC_APP_URL}/logo.png" alt="LegionFlyFF Logo" style="width: 200px; height: auto;">
                    </td>
                  </tr>
                  
                  <!-- Content -->
                  <tr>
                    <td style="padding: 40px;">
                      <h1 style="margin: 0 0 20px; color: #eab308; text-align: center; font-size: 24px;">
                        Welcome to LegionFlyFF!
                      </h1>
                      
                      <p style="margin: 0 0 20px; color: #333; font-size: 16px; line-height: 1.5; text-align: center;">
                        Thank you for registering! To start your adventure, please verify your email address by clicking the button below:
                      </p>
                      
                      <!-- Verification Button -->
                      <table role="presentation" style="width: 100%; margin: 30px 0;">
                        <tr>
                          <td align="center">
                            <a href="${verificationLink}"
                               style="display: inline-block; padding: 14px 30px; background-color: #eab308; color: #000000; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px; text-transform: uppercase; letter-spacing: 0.5px; transition: background-color 0.3s;">
                              Verify Email
                            </a>
                          </td>
                        </tr>
                      </table>
                      
                      <p style="margin: 20px 0 0; color: #666; font-size: 14px; text-align: center;">
                        This verification link will expire in 24 hours.
                      </p>
                      
                      <p style="margin: 20px 0; color: #666; font-size: 14px; text-align: center;">
                        If the button doesn't work, copy and paste this link into your browser:
                        <br>
                        <a href="${verificationLink}" style="color: #0066cc; text-decoration: none; word-break: break-all;">
                          ${verificationLink}
                        </a>
                      </p>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="padding: 20px; background-color: #1a1a1a; color: #ffffff; text-align: center;">
                      <p style="margin: 0; font-size: 14px;">
                        © ${new Date().getFullYear()} LegionFlyFF. All rights reserved.
                      </p>
                      <p style="margin: 10px 0 0; font-size: 12px; color: #999;">
                        If you didn't create an account with LegionFlyFF, please ignore this email.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `
    }

    // Verify transporter configuration before sending
    await transporter.verify()
    
    const info = await transporter.sendMail(mailOptions)
    console.log('Verification email sent:', info.messageId)
    return true
  } catch (error) {
    console.error('Error sending verification email:', {
      message: error.message,
      code: error.code,
      command: error.command
    })
    return false
  }
}

// Send temporary password email
export async function sendTemporaryPasswordEmail(email, tempPassword) {
  try {
    if (!process.env.NEXT_PUBLIC_APP_URL) {
      throw new Error('NEXT_PUBLIC_APP_URL is not configured in environment variables')
    }

    const transporter = createTransporter()
    const loginLink = `${process.env.NEXT_PUBLIC_APP_URL}/login`

    const mailOptions = {
      from: {
        name: 'LegionFlyFF',
        address: process.env.GMAIL_USER
      },
      to: email,
      subject: 'Your Temporary Password for LegionFlyFF',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Your Temporary Password</title>
        </head>
        <body style="margin: 0; padding: 0; background-color: #f4f4f4; font-family: Arial, sans-serif;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="min-width: 100%; background-color: #f4f4f4;">
            <tr>
              <td align="center" style="padding: 40px 0;">
                <table role="presentation" style="width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                  <!-- Header with Logo -->
                  <tr>
                    <td align="center" style="padding: 40px 0; background-color: #1a1a1a;">
                      <img src="${process.env.NEXT_PUBLIC_APP_URL}/logo.png" alt="LegionFlyFF Logo" style="width: 200px; height: auto;">
                    </td>
                  </tr>
                  
                  <!-- Content -->
                  <tr>
                    <td style="padding: 40px;">
                      <h1 style="margin: 0 0 20px; color: #eab308; text-align: center; font-size: 24px;">
                        Password Reset
                      </h1>
                      
                      <p style="margin: 0 0 20px; color: #333; font-size: 16px; line-height: 1.5; text-align: center;">
                        You requested a password reset. Here is your temporary password:
                      </p>
                      
                      <!-- Temporary Password -->
                      <div style="margin: 30px 0; padding: 20px; background-color: #f8f8f8; border-radius: 5px; text-align: center;">
                        <code style="font-size: 24px; color: #eab308; font-weight: bold; letter-spacing: 2px;">
                          ${tempPassword}
                        </code>
                      </div>
                      
                      <p style="margin: 20px 0; color: #333; font-size: 16px; line-height: 1.5; text-align: center;">
                        Please use this temporary password to log in. We recommend changing your password immediately after logging in.
                      </p>
                      
                      <!-- Login Button -->
                      <table role="presentation" style="width: 100%; margin: 30px 0;">
                        <tr>
                          <td align="center">
                            <a href="${loginLink}"
                               style="display: inline-block; padding: 14px 30px; background-color: #eab308; color: #000000; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px; text-transform: uppercase; letter-spacing: 0.5px; transition: background-color 0.3s;">
                              Login Now
                            </a>
                          </td>
                        </tr>
                      </table>
                      
                      <p style="margin: 20px 0 0; color: #666; font-size: 14px; text-align: center;">
                        For security reasons, please change this password immediately after logging in.
                      </p>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="padding: 20px; background-color: #1a1a1a; color: #ffffff; text-align: center;">
                      <p style="margin: 0; font-size: 14px;">
                        © ${new Date().getFullYear()} LegionFlyFF. All rights reserved.
                      </p>
                      <p style="margin: 10px 0 0; font-size: 12px; color: #999;">
                        If you didn't request this password reset, please contact support immediately.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `
    }

    // Verify transporter configuration before sending
    await transporter.verify()
    
    const info = await transporter.sendMail(mailOptions)
    console.log('Temporary password email sent:', info.messageId)
    return true
  } catch (error) {
    console.error('Error sending temporary password email:', {
      message: error.message,
      code: error.code,
      command: error.command
    })
    return false
  }
} 