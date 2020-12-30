const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const morgan = require('morgan')

const { mongoURI: db } = require("./config/keys")
const app = express()

const usersRoute = require('./routes/api/users')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/users', usersRoute)
app.use(passport.initialize())
app.use(morgan('dev'))
require("./config/passport")(passport);

mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(`MongoDB Connected @ ${db}`))
    .catch(err => console.error(err))



const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log("Started server at :" + PORT)
})