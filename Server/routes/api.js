const express = require('express')
const router = express.Router()
const City = require('../model/City')
const request = require('request')
const apiKey = "6a7a90812fc35e1855a31b95854addb0"

// Test API request with TLV
router.get('/weather', (req, res) => {
    request(`http://api.openweathermap.org/data/2.5/weather?q=tel%20aviv,il&APPID=${apiKey}&units=metric`, (err, response) => {
        console.log(response)
        res.send(response)
    })
})

// Get city by name
router.get("/city/:cityName", function(req, res){
    const cityName = req.params.cityName
    request.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`, function(error, response){
        const parsedResponse = JSON.parse(response.body)
        console.log(parsedResponse)
        res.send(parsedResponse)})
})


// Get cities in the DB and send it to the client
router.get('/cities', (req, res)=>{
    City.find({}).then(cities=>res.send(cities))
})

// Add new city to DB
router.post('/city', function (req, res) {
    const data = req.body
    console.log(data)
    const newCity = new City(data)
    newCity.save()
    res.send(newCity.name + ' was saved to the DB')
})

// Delete city from DB
router.delete('/city/:cityName', function (req, res){
    const cityName = req.params.cityName
    City.findOneAndDelete({name: cityName}).then(console.log(cityName + ' was deleted from DB'))
})

module.exports = router