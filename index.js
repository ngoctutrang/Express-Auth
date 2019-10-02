const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const authRoute = require('./routes/auth')
const postRout = require('./posts')
const app = express();
dotenv.config()
mongoose.connect(process.env.DB_CONNECT,
{ useNewUrlParser: true, useUnifiedTopology: true },
()=>console.log('Connected to DB'))
// Import Routes

//This is Midleware
app.use(express.json())
app.use('/api/user', authRoute)
app.use('/api/posts', postRout)
app.listen(3000, ()=>console.log('Server is running'))