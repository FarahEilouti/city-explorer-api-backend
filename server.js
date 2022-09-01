require('dotenv').config();
const express = require('express');// import exporess framework
const server = express();
const weatherData = require('./assets/weather.json');
const cors = require('cors');

server.use(cors()); // make any app to send a require


const PORT = 3001;

// http://localhost:3000/weather
server.get('/weather',(req,res)=>{
    let {searchQuery} = req.query;

    // console.log(req.query)
    let city = weatherData.find(item=>{
        if(searchQuery.toLowerCase() === item.city_name.toLowerCase()){
            // console.log(searchQuery, lat, lon)
            return item;
        }
    })
    // res.send(city);
    try{
        const weatherArr = city.data.map(day => new Forecast(day));
        // console.log(weatherArr)
        res.status(200).send(weatherArr);
    }catch(error){
        console.log(error)
    }

})

class Forecast {
    constructor(day){
        this.date = day.valid_date
        this.description = day.weather.description
    }

}


server.listen(PORT,()=>{
    console.log(`${PORT} is run`)
})