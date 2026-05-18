import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')

    console.log('Received verification request for token:', token)

    if (!token || token.trim() === '') {
      console.log('No token provided or empty token')
      return NextResponse.json({
        success: false,
        error: 'Verification token is missing.'
      }, { status: 400 })
    }

    const db = await connectToDatabase()

    // First, check if the token exists and is valid
    const checkResult = await db.query`
      SELECT 
        email,
        email_verified,
        verification_token,
        token_expires_at
      FROM WEBSITE_DBF.dbo.REGISTERED_USERS 
      WHERE verification_token = ${token.trim()}
    `

    // console.log('Database query result:', {
    //   hasResults: checkResult.recordset.length > 0,
    //   token: token,
    //   matchingRecords: checkResult.recordset.length,
    //   firstRecord: checkResult.recordset[0] ? {
    //     email: checkResult.recordset[0].email,
    //     isVerified: checkResult.recordset[0].email_verified === 1,
    //     hasToken: !!checkResult.recordset[0].verification_token,
    //     expiryDate: checkResult.recordset[0].token_expires_at
    //   } : null
    // })

    const user = checkResult.recordset[0]

    if (!user) {
      // If token not found, check if it was already used
      const verifiedUser = await db.query`
        SELECT email, email_verified
        FROM WEBSITE_DBF.dbo.REGISTERED_USERS
        WHERE email_verified = 1 AND verification_token IS NULL
      `

      if (verifiedUser.recordset.length > 0) {
        console.log('Token not found but user is already verified')
        return NextResponse.json({
          success: true,
          message: 'Email is already verified. You can now login.'
        }, { status: 200 })
      }

      console.log('No user found with token:', token)
      return NextResponse.json({
        success: false,
        error: 'Invalid verification token. Please request a new verification email.'
      }, { status: 400 })
    }

    // Check if already verified (BIT can be 1 or true from SQL Server driver)
    if (user.email_verified === 1 || user.email_verified === true) {
      console.log('Email already verified for user:', user.email)
      return NextResponse.json({
        success: true,
        message: 'Email already verified. You can now login.'
      }, { status: 200 })
    }

    // Check if token has expired
    const now = new Date()
    const expiryDate = new Date(user.token_expires_at)
    
    if (expiryDate < now) {
      console.log('Token expired:', {
        token,
        email: user.email,
        expiryDate: expiryDate.toISOString(),
        now: now.toISOString()
      })
      return NextResponse.json({
        success: false,
        error: 'Verification token has expired. Please request a new one.'
      }, { status: 400 })
    }

    // Perform the verification update
    try {
      const updateResult = await db.query`
        UPDATE WEBSITE_DBF.dbo.REGISTERED_USERS
        SET 
          email_verified = 1,
          verification_token = NULL,
          token_expires_at = NULL
        WHERE verification_token = ${token.trim()};

        SELECT email_verified, email
        FROM WEBSITE_DBF.dbo.REGISTERED_USERS
        WHERE email = ${user.email};
      `

      const verifiedUser = updateResult.recordset[0]
      // SQL Server BIT can be returned as 1/0 or true/false by the driver
      const isVerified = verifiedUser?.email_verified === 1 || verifiedUser?.email_verified === true
      console.log('Update result:', {
        email: verifiedUser?.email,
        isVerified
      })

      if (!verifiedUser || !isVerified) {
        throw new Error('Verification update failed')
      }

      console.log('Successfully verified email for:', user.email)
      
      const response = {
        success: true,
        message: 'Email verified successfully! You can now login.'
      }
      
      console.log('Sending success response:', response)
      return NextResponse.json(response, { 
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      })

    } catch (updateError) {
      console.error('Failed to update verification status:', updateError)
      return NextResponse.json({
        success: false,
        error: 'Failed to verify email. Please try again.'
      }, { status: 500 })
    }

  } catch (error) {
    console.error('Email verification error:', error)
    return NextResponse.json({
      success: false,
      error: 'An error occurred during verification. Please try again.'
    }, { status: 500 })
  }
} 