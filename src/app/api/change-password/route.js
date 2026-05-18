import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import bcrypt from 'bcrypt'

const SALT_ROUNDS = 10

export async function POST(request) {
  try {
    const { currentPassword, newPassword, email } = await request.json()

    if (!currentPassword || !newPassword || !email) {
      return NextResponse.json({ 
        success: false, 
        error: 'All fields are required.' 
      }, { status: 400 })
    }

    // Validate new password
    if (newPassword.length < 8) {
      return NextResponse.json({ 
        success: false, 
        error: 'New password must be at least 8 characters long.' 
      }, { status: 400 })
    }

    const db = await connectToDatabase()

    // Get current user data
    const result = await db.query`
      SELECT password_hash
      FROM WEBSITE_DBF.dbo.REGISTERED_USERS
      WHERE email = ${email}
    `

    const user = result.recordset[0]
    if (!user) {
      return NextResponse.json({ 
        success: false, 
        error: 'User not found.' 
      }, { status: 404 })
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password_hash)
    if (!isCurrentPasswordValid) {
      return NextResponse.json({ 
        success: false, 
        error: 'Current password is incorrect.' 
      }, { status: 401 })
    }

    // Hash new password
    const newPasswordHash = await bcrypt.hash(newPassword, SALT_ROUNDS)

    // Update password
    await db.query`
      UPDATE WEBSITE_DBF.dbo.REGISTERED_USERS
      SET password_hash = ${newPasswordHash}
      WHERE email = ${email}
    `

    return NextResponse.json({
      success: true,
      message: 'Password updated successfully.'
    })

  } catch (error) {
    console.error('Change password error:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'An error occurred while changing the password.' 
    }, { status: 500 })
  }
}
