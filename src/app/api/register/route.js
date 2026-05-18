import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import bcrypt from 'bcrypt'
import { generateVerificationToken, sendVerificationEmail } from '@/lib/emailUtils'

const SALT_ROUNDS = 10

export async function POST(req) {
  try {
    const body = await req.json()
    const { email, password, confirmPassword, pin, confirmPin } = body

    // Validation checks
    if (!email || !password || !confirmPassword || !pin || !confirmPin) {
      return NextResponse.json({ success: false, error: 'All fields are required.' }, { status: 400 })
    }

    if (!email.endsWith('@gmail.com')) {
      return NextResponse.json({ success: false, error: 'Only Gmail addresses are allowed.' }, { status: 400 })
    }

    if (password !== confirmPassword) {
      return NextResponse.json({ success: false, error: 'Passwords do not match.' }, { status: 400 })
    }

    if (pin !== confirmPin) {
      return NextResponse.json({ success: false, error: 'PINs do not match.' }, { status: 400 })
    }

    if (!/^\d{4,6}$/.test(pin)) {
      return NextResponse.json({ success: false, error: 'PIN must be 4–6 digits.' }, { status: 400 })
    }

    const db = await connectToDatabase()

    // Check if email already exists
    const existing = await db.query`
      SELECT email FROM WEBSITE_DBF.dbo.REGISTERED_USERS WHERE email = ${email}
    `
    if (existing.recordset.length > 0) {
      return NextResponse.json({ success: false, error: 'Email is already registered.' }, { status: 409 })
    }

    // Generate hashes and verification token
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS)
    const pinHash = await bcrypt.hash(pin, SALT_ROUNDS)
    const verificationToken = generateVerificationToken()
    const tokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours from now

    console.log('Generated verification token:', {
      email,
      token: verificationToken,
      expiresAt: tokenExpiresAt.toISOString()
    })

    // Insert user with verification token
    const insertResult = await db.query`
      INSERT INTO WEBSITE_DBF.dbo.REGISTERED_USERS (
        email,
        password_hash,
        pin_hash,
        role,
        verification_token,
        email_verified,
        token_expires_at,
        created_at
      )
      VALUES (
        ${email},
        ${passwordHash},
        ${pinHash},
        ${'user'},
        ${verificationToken},
        ${0},
        ${tokenExpiresAt},
        ${new Date()}
      );
      SELECT SCOPE_IDENTITY() as userId;
    `

    // Verify the token was stored correctly
    const verifyToken = await db.query`
      SELECT verification_token, email_verified, token_expires_at
      FROM WEBSITE_DBF.dbo.REGISTERED_USERS
      WHERE email = ${email}
    `

    console.log('Verification token stored:', {
      email,
      storedToken: verifyToken.recordset[0]?.verification_token,
      emailVerified: verifyToken.recordset[0]?.email_verified,
      tokenExpiresAt: verifyToken.recordset[0]?.token_expires_at
    })

    // Send verification email
    const emailSent = await sendVerificationEmail(email, verificationToken)

    if (!emailSent) {
      console.error('Failed to send verification email to:', email)
      return NextResponse.json({
        success: true,
        message: 'Account created but verification email could not be sent. Please use the resend verification option.'
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Account registered successfully. Please check your email to verify your account.'
    })

  } catch (err) {
    console.error('Registration error:', err)
    return NextResponse.json({
      success: false,
      error: 'Server error during registration. Please try again.'
    }, { status: 500 })
  }
}
