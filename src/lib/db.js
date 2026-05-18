import sql from 'mssql'

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: false,
    trustServerCertificate: true,
    ...(process.env.DB_INSTANCE ? { instanceName: process.env.DB_INSTANCE } : {}),
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
}

if (!process.env.DB_INSTANCE && process.env.DB_PORT) {
  config.port = parseInt(process.env.DB_PORT, 10)
}

const globalForSql = globalThis

if (!globalForSql.__flyfSqlPool) {
  globalForSql.__flyfSqlPool = null
}

let pool = globalForSql.__flyfSqlPool

export const connectToDatabase = async () => {
  try {
    if (!pool) {
      console.log('Creating new connection pool...')
      pool = await new sql.ConnectionPool(config).connect()
      globalForSql.__flyfSqlPool = pool
      pool.on('error', err => {
        console.error('Database pool error:', err)
        pool = null
        globalForSql.__flyfSqlPool = null
      })

      const testRequest = pool.request()
      await testRequest.query('SELECT 1')
    }
    
    return pool
  } catch (error) {
    console.error('❌ Database connection failed:', error)
    pool = null // Reset pool on error
    globalForSql.__flyfSqlPool = null
    throw new Error('Database connection failed')
  }
}

// Function to close the pool (use when shutting down the application)
export const closePool = async () => {
  try {
    if (pool) {
      await pool.close()
      pool = null
      globalForSql.__flyfSqlPool = null
      console.log('Database pool closed successfully')
    }
  } catch (error) {
    console.error('Error closing database pool:', error)
    throw error
  }
}
