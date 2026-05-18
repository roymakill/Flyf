// /src/app/api/logout/route.js
import { NextResponse } from 'next/server'
import { serialize } from 'cookie'

export async function GET() {
  const cookie = serialize('flyff_session', '', {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
    expires: new Date(0), // Expire cookie now
  })

  const res = NextResponse.json({ success: true })
  res.headers.set('Set-Cookie', cookie)
  return res
}
