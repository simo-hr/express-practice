import { promisify } from 'util'
import config from '../../config/mysql.config'
import mysql from 'mysql'

const pool: mysql.Pool = mysql.createPool({
  host: config.HOST,
  user: config.USERNAME,
  password: config.PASSWORD,
  database: config.DATABASE,
  connectionLimit: config.CONNECTION_LIMIT,
  queueLimit: config.QUEUE_LIMIT,
})

const getConnection = promisify(pool.getConnection).bind(pool)
const executeQuery = promisify(pool.query).bind(pool)
const releaseConnection = (connection: any) => {
  connection.release()
}
const end = promisify(pool.end).bind(pool)

export { pool, getConnection, executeQuery, releaseConnection, end }
