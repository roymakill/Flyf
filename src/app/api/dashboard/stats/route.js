import { NextResponse } from 'next/server'
import sql from 'mssql'
import { connectToDatabase } from '@/lib/db'
import { jobMapping } from '@/utils/jobUtils'

export async function GET() {
  let db = null;
  try {
    console.log('Attempting to connect to database...')
    db = await connectToDatabase()
    if (!db) {
      console.error('Database connection failed')
      throw new Error('Failed to connect to database')
    }
    console.log('Database connection successful')

    // Create a transaction to ensure all queries use the same connection
    const transaction = new sql.Transaction(db)
    await transaction.begin()

    // Create a request bound to the transaction
    const request = new sql.Request(transaction)

    // Get online players count and list
    console.log('Fetching online players...')
    const onlinePlayersResult = await request.query(`
      SELECT 
        COUNT(*) as total,
        COUNT(CASE WHEN m_nLevel >= 105 THEN 1 END) as high_level,
        COUNT(CASE WHEN m_nLevel < 60 THEN 1 END) as low_level
      FROM CHARACTER_01_DBF.dbo.CHARACTER_TBL 
      WHERE MultiServer = 1
    `)

    // Get total accounts and characters
    console.log('Fetching account statistics...')
    const accountsResult = await request.query(`
      SELECT 
        (SELECT COUNT(*) FROM ACCOUNT_DBF.dbo.ACCOUNT_TBL) as total_accounts,
        (SELECT COUNT(*) FROM CHARACTER_01_DBF.dbo.CHARACTER_TBL) as total_characters,
        (SELECT COUNT(*) FROM CHARACTER_01_DBF.dbo.CHARACTER_TBL WHERE m_nLevel = 105) as max_level_chars
    `)

    // Get today's statistics
    console.log('Fetching today\'s statistics...')
    const todayStats = await request.query(`
      SELECT
        (SELECT COUNT(*) FROM ACCOUNT_DBF.dbo.[ACCOUNT_TBL_DETAIL] WHERE CAST(regdate AS DATE) = CAST(GETDATE() AS DATE)) as new_accounts,
        (SELECT COUNT(*) FROM CHARACTER_01_DBF.dbo.CHARACTER_TBL WHERE CAST(CreateTime AS DATE) = CAST(GETDATE() AS DATE)) as new_characters,
        (SELECT COUNT(*) FROM LOGGING_01_DBF.dbo.tblTradeLog WHERE CAST(TradeDt AS DATE) = CAST(GETDATE() AS DATE)) as trades_today,
        (SELECT COUNT(*) FROM CHARACTER_01_DBF.dbo.MAIL_TBL WHERE CAST(Senddt AS DATE) = CAST(GETDATE() AS DATE)) as mails_today
    `)

    // Get top 5 highest level characters
    console.log('Fetching top characters...')
    const topCharacters = await request.query(`
      SELECT TOP 5
        m_szName as name,
        m_nLevel as level,
        m_dwGold as gold,
        CreateTime as created_at
      FROM CHARACTER_01_DBF.dbo.CHARACTER_TBL
      ORDER BY m_nLevel DESC, m_dwGold DESC
    `)

    // Get recent trades
    console.log('Fetching recent trades...')
    const recentTrades = await request.query(`
      SELECT TOP 5
        t.TradeID,
        FORMAT(DATEADD(SECOND, CAST(t.TradeDt AS BIGINT), '1970-01-01'), 'yyyy-MM-dd HH:mm:ss') AS TradeDt,
        p1.m_szName AS Player1,
        p2.m_szName AS Player2
      FROM [LOGGING_01_DBF].[dbo].[tblTradeLog] t
      LEFT JOIN [LOGGING_01_DBF].[dbo].[tblTradeDetailLog] td1 ON t.TradeID = td1.TradeID
      LEFT JOIN CHARACTER_01_DBF.dbo.CHARACTER_TBL p1 ON p1.m_idPlayer = td1.idPlayer
      LEFT JOIN [LOGGING_01_DBF].[dbo].[tblTradeDetailLog] td2 ON t.TradeID = td2.TradeID AND td2.idPlayer <> td1.idPlayer
      LEFT JOIN CHARACTER_01_DBF.dbo.CHARACTER_TBL p2 ON p2.m_idPlayer = td2.idPlayer
      ORDER BY t.TradeDt DESC
    `)

    // Get class distribution
    console.log('Fetching class distribution...')
    const classDistribution = await request.query(`
      SELECT 
        m_nJob as job_id,
        COUNT(*) as count
      FROM CHARACTER_01_DBF.dbo.CHARACTER_TBL
      GROUP BY m_nJob
      ORDER BY count DESC
    `)

    // Commit the transaction
    await transaction.commit()
    console.log('All queries completed successfully')

    // Map the job IDs to names using jobUtils mapping
    const mappedClassDistribution = classDistribution.recordset.map(row => ({
      class_name: jobMapping[row.job_id] || 'Unknown',
      class_id: row.job_id,
      count: row.count
    }))

    // Return all statistics
    return NextResponse.json({
      online_players: {
        total: onlinePlayersResult.recordset[0].total,
        high_level: onlinePlayersResult.recordset[0].high_level,
        low_level: onlinePlayersResult.recordset[0].low_level
      },
      accounts: {
        total: accountsResult.recordset[0].total_accounts,
        total_characters: accountsResult.recordset[0].total_characters,
        max_level_chars: accountsResult.recordset[0].max_level_chars
      },
      today: {
        new_accounts: todayStats.recordset[0].new_accounts,
        new_characters: todayStats.recordset[0].new_characters,
        trades: todayStats.recordset[0].trades_today,
        mails: todayStats.recordset[0].mails_today
      },
      top_characters: topCharacters.recordset,
      recent_trades: recentTrades.recordset,
      class_distribution: mappedClassDistribution
    })

  } catch (error) {
    console.error('Dashboard API error:', error)
    return NextResponse.json({ 
      error: error.message || 'Failed to fetch dashboard statistics',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 })
  }
} 