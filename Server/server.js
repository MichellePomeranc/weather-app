const express = require('express')
const app = express()
const api = require('./routes/api')
const City = require("./model/City.js")
const path = require('path')

const mongoose = require('mongoose')
const bodyParser = require("body-parser")

app.use(express.static(path.join(__dirname, '../dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/', api)

mongoose.connect('mongodb://localhost/weatherDB', {
    useNewUrlParser: true
})

const port = 3000
app.listen(port, function () {
    console.log(`running server on port ${port}`)
})