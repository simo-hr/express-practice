import { executeQuery } from './pool'
import path from 'path'
import mysql from 'mysql'

const { sql } = require('@garafu/mysql-fileloader')({ root: path.join(__dirname, './sql') })
const MySQLClient = {
  executeQuery: async (query: mysql.Query, values: any[]) => {
    const result = await executeQuery(query, values)
    return result
  },
}

export { MySQLClient, sql }
