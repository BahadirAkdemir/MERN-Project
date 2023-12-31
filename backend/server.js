const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const path = require('path')

const PORT = process.env.PORT

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.joinh(__dirname, '../frontend/build')))

    app.get('*', (req, res) => {
        res.sendFile(__dirname, '../', 'frontend', 'build', 'index.html')
    })
}
else
{
    app.get('/', (req, res) => {
        res.send('API is running')
    })
}

app.get('/', (req, res) => {
    res.json({
        message: 'Hello World'})
})

// Routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))

app.use(errorHandler)

app.listen(PORT, () => {
})
