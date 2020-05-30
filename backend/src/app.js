const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require("body-parser")
const cors = require('cors')
require('dotenv/config')

const app = express()

mongoose.connect(`mongodb+srv://${process.env.MONGODB_LOGIN}:${process.env.MONGODB_PASS}@login-vlxvu.mongodb.net/auth?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const routes = require('./routes')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(routes)

app.listen(3333)
