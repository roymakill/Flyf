import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import bcrypt from 'bcrypt'
import { sendTemporaryPasswordEmail } from '@/lib/emailUtils'

const SALT_ROUNDS = 10

function generateTemporaryPassword() {
  // Generate a random 12-character password with letters and numbers
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let temp = ''
  for (let i = 0; i < 12; i++) {
    temp += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return temp
}

export async function POST(request) {
  try {
    const { email, pin } = await request.json()

    if (!email || !pin) {
      return NextResponse.json({ 
        success: false, 
        error: 'Email and PIN are required.' 
      }, { status: 400 })
    }

    // Validate PIN format
    if (!/^\d{4,6}$/.test(pin)) {
      return NextResponse.json({ 
        success: false, 
        error: 'PIN must be 4-6 digits.' 
      }, { status: 400 })
    }

    const db = await connectToDatabase()

    // Check if user exists, is verified, and validate PIN
    const result = await db.query`
      SELECT email, email_verified, pin_hash
      FROM WEBSITE_DBF.dbo.REGISTERED_USERS
      WHERE email = ${email}
    `

    const user = result.recordset[0]

    if (!user) {
      return NextResponse.json({ 
        success: false, 
        error: 'No account found with this email address.' 
      }, { status: 404 })
    }

    if (!user.email_verified) {
      return NextResponse.json({ 
        success: false, 
        error: 'Please verify your email address first.' 
      }, { status: 400 })
    }

    // Verify PIN
    const pinMatch = await bcrypt.compare(pin, user.pin_hash)
    if (!pinMatch) {
      return NextResponse.json({ 
        success: false, 
        error: 'Invalid PIN.' 
      }, { status: 401 })
    }

    // Generate and hash temporary password
    const tempPassword = generateTemporaryPassword()
    const hashedPassword = await bcrypt.hash(tempPassword, SALT_ROUNDS)

    // Update user's password in database
    await db.query`
      UPDATE WEBSITE_DBF.dbo.REGISTERED_USERS
      SET password_hash = ${hashedPassword}
      WHERE email = ${email}
    `

    // Send email with temporary password
    const emailSent = await sendTemporaryPasswordEmail(email, tempPassword)

    if (!emailSent) {
      return NextResponse.json({ 
        success: false, 
        error: 'Failed to send temporary password email. Please try again.' 
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'A temporary password has been sent to your email address.'
    })

  } catch (error) {
    console.error('Forgot password error:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'An error occurred. Please try again.' 
    }, { status: 500 })
  }
} 