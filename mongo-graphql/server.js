import express from 'express'
import bodyParser from 'body-parser'
import DB from './utils/database.js'
import { graphqlHTTP } from 'express-graphql'
import schema from './schemata/book.js'
// 使用ポートの設定
const PORT = 8080
// Express初期化
const app = express()

app.use(bodyParser.json());

DB.connect()

app.use('/hello', (req, res) => {
  res.send('Hello World!')
})

app.use('/graphql', graphqlHTTP({ schema, graphiql: true }))

app.listen(PORT, () => {
  console.log(`Started on port ${PORT}`)
})
