const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=1d4224368eb937231880676a6873b07f&units=metric`
    request({url, json:true}, (error, { body }) => {
        if (error) {
            console.log("can't connect to the weather service", undefined)
        }
        else if (body.cod!== 200) {
            callback("Unable to find a location", undefined)
        }

        else {
            callback(undefined, 
                `${body.weather[0].description}. It is currently ${body.main.temp} degrees out and humidity is ${body.main.humidity} and windspeed is ${body.wind.speed} km/h.`)
        }
    }) 


}

module.exports.forecast = forecast
