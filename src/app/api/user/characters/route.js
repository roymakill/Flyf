import { getServerSession } from 'next-auth/next'
import { NextResponse } from 'next/server'

export async function GET(req) {
  try {
    // Get the user's session
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Replace this with your actual database query
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/characters`, {
      headers: {
        'Authorization': `Bearer ${session.user.token}` // If you're using token-based auth
      }
    })

    const data = await response.json()
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch characters')
    }

    return NextResponse.json({ characters: data.characters })
  } catch (error) {
    console.error('Error fetching characters:', error)
    return NextResponse.json(
      { error: 'Failed to fetch characters' },
      { status: 500 }
    )
  }
} 