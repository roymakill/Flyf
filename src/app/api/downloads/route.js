import { connectToDatabase } from '@/lib/db'

let cachedLinks = null
let cachedLinksAt = 0
const CACHE_TTL_MS = 30000

export async function GET() {
  try {
    if (cachedLinks && Date.now() - cachedLinksAt < CACHE_TTL_MS) {
      return Response.json(cachedLinks)
    }

    const pool = await connectToDatabase()
    const result = await pool.request().query('SELECT * FROM WEBSITE_DBF.dbo.DownloadLinks ORDER BY id DESC')
    cachedLinks = result.recordset
    cachedLinksAt = Date.now()

    return Response.json(cachedLinks)
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}

export async function POST(req) {
  try {
    const { name, url, size, icon_type } = await req.json()
    const pool = await connectToDatabase()
    await pool
      .request()
      .input('name', name)
      .input('url', url)
      .input('size', size)
      .input('icon_type', icon_type || 'default')
      .query(`INSERT INTO WEBSITE_DBF.dbo.DownloadLinks (name, url, size, icon_type) VALUES (@name, @url, @size, @icon_type)`)

    cachedLinks = null
    cachedLinksAt = 0

    return Response.json({ message: 'Link added successfully' }, { status: 201 })
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}
