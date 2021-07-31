const express = require('express')
const app = express()
app.use(express.json())
require('dotenv').config() //library is used to read .env file variables
const http = require('http')
const server = http.createServer(app)
require('express-async-errors')
require('./startup/db')()

app.use('/api/products', require('./routes/products'))
app.use('/api/brands', require('./routes/brands'))
app.use('/api/cats', require('./routes/cats'))
app.use('/api/carts', require('./routes/carts'))
app.use(require('./startup/errors'))

const port = process.env.PORT || 3000
server.listen(port, () => console.log(`server listening on port= ${port}`))