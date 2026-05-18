import { NextResponse } from 'next/server'
import { verifyEmailConfig } from '@/lib/emailUtils'

export async function GET() {
  try {
    const isValid = await verifyEmailConfig()
    
    if (isValid) {
      return NextResponse.json({ 
        success: true, 
        message: 'Email configuration is valid',
        config: {
          gmail_user: process.env.GMAIL_USER ? 'Configured' : 'Missing',
          gmail_password: process.env.GMAIL_APP_PASSWORD ? 'Configured' : 'Missing',
          app_url: process.env.NEXT_PUBLIC_APP_URL || 'Missing'
        }
      })
    } else {
      return NextResponse.json({ 
        success: false, 
        error: 'Email configuration is invalid' 
      }, { status: 400 })
    }
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 })
  }
} 