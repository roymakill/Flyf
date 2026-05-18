import { connectToDatabase } from '@/lib/db'
import crypto from 'crypto'

const SALT = process.env.SALT_PASSWORD || 'kikugalanet'

// Max lengths for Flyff ACCOUNT_TBL / ACCOUNT_TBL_DETAIL (avoid "String or binary data would be truncated")
const MAX_ACCOUNT = 18
const MAX_REALNAME = 18
const MAX_EMAIL = 64

export async function POST(req) {
  try {
    const body = await req.json()
    const { username, password, repeatpass, emailadd } = body

    if (!username || !password || !repeatpass || !emailadd) {
      return Response.json({ error: 'All fields are required.' }, { status: 400 })
    }

    const account = String(username).trim().slice(0, MAX_ACCOUNT)
    const realname = String(username).trim().slice(0, MAX_REALNAME)
    const email = String(emailadd).trim().slice(0, MAX_EMAIL)

    if (account.length === 0) {
      return Response.json({ error: 'Username is required.' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return Response.json({ error: 'Invalid email format.' }, { status: 400 })
    }

    if (password !== repeatpass) {
      return Response.json({ error: 'Passwords do not match.' }, { status: 400 })
    }

    if (account.length < username.trim().length) {
      return Response.json({ error: `Username must be ${MAX_ACCOUNT} characters or less.` }, { status: 400 })
    }

    const hashedPassword = crypto.createHash('md5').update(SALT + password).digest('hex')

    const pool = await connectToDatabase()

    // Check for duplicate username
    const userCheck = await pool
      .request()
      .input('username', account)
      .query(`SELECT COUNT(*) as count FROM [ACCOUNT_DBF].[dbo].[ACCOUNT_TBL] WHERE account = @username`)

    if (userCheck.recordset[0].count > 0) {
      return Response.json({ error: 'Username already exists.' }, { status: 400 })
    }
    // Insert into ACCOUNT_TBL (realname is NOT NULL; use username as initial value)
    await pool
      .request()
      .input('username', account)
      .input('password', hashedPassword)
      .input('realname', realname)
      .query(`
        INSERT INTO [ACCOUNT_DBF].[dbo].[ACCOUNT_TBL] (account, password, realname, isuse, member)
        VALUES (@username, @password, @realname, 'F', 'A')
      `)

    // Insert into ACCOUNT_TBL_DETAIL
    await pool
      .request()
      .input('username', account)
      .input('email', email)
      .input('regdate', new Date().toISOString())
      .query(`
        INSERT INTO [ACCOUNT_DBF].[dbo].[ACCOUNT_TBL_DETAIL]
        (account, gamecode, tester, m_chLoginAuthority, regdate, BlockTime, EndTime, WebTime, isuse, email)
        VALUES (@username, 'A000', 2, 'F', @regdate, 0, 0, 0, 'O', @email)
      `)

    return Response.json({ success: 'Successfully created account!' })
  } catch (err) {
    console.error('Create account error:', err)
    return Response.json({ error: 'Server error. Try again later.' }, { status: 500 })
  }
}
