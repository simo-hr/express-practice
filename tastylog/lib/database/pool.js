const { promisify } = require('util')
const config = require('../../config/mysql.config')
const mysql = require('mysql')
const pool = mysql.createPool({
  host: config.HOST,
  port: config.POST,
  user: config.USERNAME,
  password: config.PASSWORD,
  database: config.DATABASE,
  connectionLimit: config.CONNECTION_LIMIT,
  queueLimit: config.QUEUE_LIMIT,
})

module.exports = {
  pool,
  getConnection: promisify(pool.getConnection).bind(pool),
  executeQuery: promisify(pool.query).bind(pool),
  releaseConnection: (connection) => {
    connection.release()
  },
  end: promisify(pool.end).bind(pool),
}
