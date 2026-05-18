import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import { serialize } from 'cookie'
import bcrypt from 'bcrypt'

export async function POST(request) {
  try {
    const { username, password } = await request.json()

    const db = await connectToDatabase()

    const result = await db.query`
      SELECT 
        email,
        password_hash,
        email_verified,
        is_active,
        role,
        verification_token,
        token_expires_at
      FROM WEBSITE_DBF.dbo.REGISTERED_USERS
      WHERE email = ${username}
    `

    const user = result.recordset[0]

    if (!user || !user.password_hash) {
      return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 })
    }

    const match = await bcrypt.compare(password, user.password_hash)

    if (!match) {
      return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 })
    }

    // Check if email is verified
    if (!user.email_verified) {
      // Check if verification token is expired
      const tokenExpired = user.token_expires_at && new Date(user.token_expires_at) < new Date()
      
      if (tokenExpired) {
        return NextResponse.json({ 
          success: false, 
          error: 'Email verification expired. Please request a new verification email.',
          code: 'VERIFICATION_EXPIRED'
        }, { status: 403 })
      }
      
      return NextResponse.json({ 
        success: false, 
        error: 'Please verify your email before logging in.',
        code: 'EMAIL_NOT_VERIFIED'
      }, { status: 403 })
    }

    if (!user.is_active) {
      return NextResponse.json({ success: false, error: 'Account is inactive.' }, { status: 403 })
    }

    const safeRole = typeof user.role === 'string' && user.role.trim() ? user.role : 'user'
    const sessionToken = `${user.email}|${Date.now()}|${safeRole}`

    const res = NextResponse.json({
      success: true,
      user: {
        email: user.email,
        email_verified: user.email_verified,
        is_active: user.is_active,
        role: user.role,
      },
    })

    res.headers.set(
      'Set-Cookie',
      serialize('flyff_session', sessionToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict',
        path: '/',
        maxAge: 60 * 60 * 24, // 1 day
      })
    )

    return res
  } catch (err) {
    console.error('[LOGIN ERROR]', err)
    return NextResponse.json({ 
      success: false, 
      error: 'An error occurred during login. Please try again.' 
    }, { status: 500 })
  }
}
