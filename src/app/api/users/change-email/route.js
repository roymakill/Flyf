import { connectToDatabase } from '@/lib/db'
import sql from 'mssql'

export async function POST(req) {
  try {
    const { account, new_email } = await req.json()

    if (!account || !new_email) {
      return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 })
    }

    // ✅ Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(new_email)) {
      return new Response(JSON.stringify({ error: 'Invalid email format' }), { status: 400 })
    }

    const pool = await connectToDatabase()

    // ✅ Check if the email exists anywhere in the system
    const existing = await pool.request()
    .input('email', sql.VarChar, new_email)
    .query(`
        SELECT COUNT(*) as count
        FROM WEBSITE_DBF.dbo.REGISTERED_USERS
        WHERE email = @email
    `)

    if (existing.recordset[0].count === 0) {
    return new Response(JSON.stringify({ error: 'Email not found in the system.' }), { status: 404 })
    }

    // ✅ Begin SQL transaction
    const transaction = new sql.Transaction(pool)
    await transaction.begin()

    try {
      const request = new sql.Request(transaction)

      // Update ACCOUNT_TBL_DETAIL
      await request
        .input('account', sql.VarChar, account)
        .input('email', sql.VarChar, new_email)
        .query(`
          UPDATE ACCOUNT_DBF.dbo.ACCOUNT_TBL_DETAIL
          SET email = @email
          WHERE account = @account
        `)

      await transaction.commit()
      return new Response(JSON.stringify({ success: 'Email updated successfully!' }), { status: 200 })

    } catch (txErr) {
      await transaction.rollback()
      console.error('[TRANSACTION ERROR]', txErr)
      return new Response(JSON.stringify({ error: 'Failed to update email.' }), { status: 500 })
    }

  } catch (err) {
    console.error('[EMAIL UPDATE ERROR]', err)
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 })
  }
}
