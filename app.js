const express = require('express')
const userRoute = require('./routes/userRoute')
const bookRoute = require('./routes/bookRoute')
const connectDB = require('./config/db')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT

//parsing
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//routes
app.use('/api', userRoute)
app.use('/api', bookRoute)

//mongoDB connection function call
connectDB()

app.listen(PORT, () => console.log(`server running on port-${PORT}`))