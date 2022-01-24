import express from 'express'
import path from 'path'
import root from './routes/index'
import search from './routes/search'
const app = express()

// Express settings
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')
app.disable('x-powered-by')

app.use('/search', search)
app.use('/', root)

app.listen(3001, () => console.log('Server is running'))
