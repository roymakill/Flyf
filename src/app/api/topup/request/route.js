import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import { writeFile } from 'fs/promises'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await req.formData()
    const itemId = formData.get('itemId')
    const username = formData.get('username')
    const attachment = formData.get('attachment')

    if (!itemId || !username || !attachment) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Handle attachment upload
    const bytes = await attachment.arrayBuffer()
    const buffer = Buffer.from(bytes)
    
    // Create unique filename
    const filename = `${uuidv4()}-${attachment.name}`
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'topup')
    const filepath = path.join(uploadDir, filename)
    
    // Save file
    await writeFile(filepath, buffer)
    const attachmentUrl = `/uploads/topup/${filename}`

    // Connect to database
    const db = await connectToDatabase()

    // Get item details
    const [item] = await db.query(
      'SELECT * FROM topup_items WHERE id = ?',
      [itemId]
    )

    if (!item) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 })
    }

    // Create top-up request
    const [result] = await db.query(
      `INSERT INTO topup_requests 
       (user_id, item_id, username, amount, points, attachment_url, status) 
       VALUES (?, ?, ?, ?, ?, ?, 'pending')`,
      [
        session.user.id,
        itemId,
        username,
        item.price,
        item.points,
        attachmentUrl
      ]
    )

    return NextResponse.json({
      message: 'Top-up request submitted successfully',
      requestId: result.insertId
    })
  } catch (error) {
    console.error('Top-up request error:', error)
    return NextResponse.json(
      { error: 'Failed to submit top-up request' },
      { status: 500 }
    )
  }
} 