import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'

let cachedResponse = null
let cachedAt = 0
const CACHE_TTL_MS = 30000

export async function GET() {
  try {
    if (cachedResponse && Date.now() - cachedAt < CACHE_TTL_MS) {
      return NextResponse.json(cachedResponse)
    }

    const db = await connectToDatabase()

    const databaseCheck = await db.query`
      SELECT DB_ID(N'CHARACTER_01_DBF') AS characterDbId
    `

    if (!databaseCheck.recordset[0]?.characterDbId) {
      cachedResponse = {
        success: true,
        status: 'offline',
        playersOnline: 0
      }
      cachedAt = Date.now()
      return NextResponse.json(cachedResponse)
    }

    const result = await db.query`
      SELECT COUNT(*) AS onlineCount
      FROM [CHARACTER_01_DBF].[dbo].[CHARACTER_TBL]
      WHERE [MultiServer] = 1
    `

    const count = result.recordset[0]?.onlineCount || 0

    cachedResponse = {
      success: true,
      status: count > 0 ? 'online' : 'offline',
      playersOnline: count
    }
    cachedAt = Date.now()

    return NextResponse.json(cachedResponse)
  } catch (error) {
    console.error('Server status error:', error)
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
  }
}
