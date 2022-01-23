import express from 'express'
import root from './routes/index'
import path from 'path'
const app = express()

// Express settings
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')
app.disable('x-powered-by')

app.get('/', root)

app.listen(3001, () => console.log('Server is running'))
