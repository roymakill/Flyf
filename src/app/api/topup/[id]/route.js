import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import { getServerSession } from 'next-auth'
import { writeFile } from 'fs/promises'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'

export async function PUT(request, { params }) {
  try {
    const session = await getServerSession()
    if (!session?.user?.role === 'super') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = params
    const formData = await request.formData()
    const name = formData.get('name')
    const description = formData.get('description')
    const price = formData.get('price')
    const points = formData.get('points')
    const category = formData.get('category')
    const isOnSale = formData.get('isOnSale') === 'true'
    const salePercentage = formData.get('salePercentage')
    const image = formData.get('image')

    let imageUrl = undefined // undefined means don't update the image
    if (image && image.size > 0) { // Only process if there's actually an image
      // Handle image upload
      const buffer = Buffer.from(await image.arrayBuffer())
      const fileName = `${uuidv4()}-${image.name}`
      const filePath = path.join(process.cwd(), 'public/uploads', fileName)
      await writeFile(filePath, buffer)
      imageUrl = `/uploads/${fileName}`
    }

    const pool = await connectToDatabase()
    
    // Build the update query dynamically based on whether we have a new image
    let updateQuery = `
      UPDATE [WEBSITE_DBF].[dbo].[topup_items]
      SET 
        name = @name,
        description = @description,
        price = @price,
        points = @points,
        category = @category,
        is_on_sale = @isOnSale,
        sale_percentage = @salePercentage,
        updated_at = GETDATE()
    `
    
    if (imageUrl !== undefined) {
      updateQuery += `, image_url = @imageUrl`
    }
    
    updateQuery += `
      OUTPUT INSERTED.*
      WHERE id = @id
    `

    const dbRequest = pool.request()
      .input('id', id)
      .input('name', name)
      .input('description', description)
      .input('price', price)
      .input('points', points)
      .input('category', category)
      .input('isOnSale', isOnSale ? 1 : 0)
      .input('salePercentage', salePercentage || null)
    
    if (imageUrl !== undefined) {
      dbRequest.input('imageUrl', imageUrl)
    }

    const result = await dbRequest.query(updateQuery)

    if (result.recordset.length === 0) {
      return NextResponse.json({ error: 'Top-up item not found' }, { status: 404 })
    }

    return NextResponse.json(result.recordset[0])
  } catch (error) {
    console.error('Database Error:', error)
    return NextResponse.json({ error: 'Failed to update top-up item' }, { status: 500 })
  }
}
