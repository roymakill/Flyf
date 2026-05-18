import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import { writeFile } from 'fs/promises'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'
import { getServerSession } from 'next-auth'

let cachedItems = null
let cachedItemsAt = 0
const CACHE_TTL_MS = 15000

// GET all top-up items
export async function GET() {
  try {
    if (cachedItems && Date.now() - cachedItemsAt < CACHE_TTL_MS) {
      return NextResponse.json(cachedItems)
    }

    const pool = await connectToDatabase()
    const result = await pool.request().query(`
      SELECT * FROM [WEBSITE_DBF].[dbo].[topup_items] 
      ORDER BY category, price ASC
    `)
    cachedItems = result.recordset
    cachedItemsAt = Date.now()

    return NextResponse.json(cachedItems)
  } catch (error) {
    console.error('Database Error:', error)
    return NextResponse.json({ error: 'Failed to fetch top-up items' }, { status: 500 })
  }
}

// POST new top-up item
export async function POST(request) {
  try {
    const session = await getServerSession()
    if (!session?.user?.role === 'super') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const name = formData.get('name')
    const description = formData.get('description')
    const price = formData.get('price')
    const points = formData.get('points')
    const category = formData.get('category')
    const isOnSale = formData.get('isOnSale') === 'true'
    const salePercentage = formData.get('salePercentage')
    const image = formData.get('image')

    let imageUrl = null
    if (image && image.size > 0) {
      // Handle image upload
      const buffer = Buffer.from(await image.arrayBuffer())
      const fileName = `${uuidv4()}-${image.name}`
      const filePath = path.join(process.cwd(), 'public/uploads', fileName)
      await writeFile(filePath, buffer)
      imageUrl = `/uploads/${fileName}`
    }

    const pool = await connectToDatabase()
    const result = await pool.request()
      .input('name', name)
      .input('description', description)
      .input('price', price)
      .input('points', points)
      .input('category', category)
      .input('isOnSale', isOnSale ? 1 : 0)
      .input('salePercentage', salePercentage || null)
      .input('imageUrl', imageUrl)
      .query(`
        INSERT INTO [WEBSITE_DBF].[dbo].[topup_items] (
          name, description, price, points, category, 
          is_on_sale, sale_percentage, image_url
        ) 
        OUTPUT INSERTED.*
        VALUES (
          @name, @description, @price, @points, @category, 
          @isOnSale, @salePercentage, @imageUrl
        )
      `)

    cachedItems = null
    cachedItemsAt = 0

    return NextResponse.json(result.recordset[0])
  } catch (error) {
    console.error('Database Error:', error)
    return NextResponse.json({ error: 'Failed to create top-up item' }, { status: 500 })
  }
} 
