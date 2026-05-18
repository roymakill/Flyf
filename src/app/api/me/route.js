export const dynamic = 'force-dynamic' // Required for cookie/session-based routes

import { cookies } from 'next/headers'

export async function GET() {
  try {
    const cookieStore = await cookies() // ✅ await this now
    const session = cookieStore.get('flyff_session')

    if (!session?.value) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const parts = session.value.split('|')
    if (parts.length < 3) {
      return new Response(JSON.stringify({ error: 'Invalid session format' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }

    const [email, timestamp, member] = parts
    const role = member === 'super' ? 'super' : 'user'

    return new Response(JSON.stringify({
      success: true,
      email,
      role
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })

  } catch (err) {
    console.error('[API /me] Unexpected Error:', err)
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}
