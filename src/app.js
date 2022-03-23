const path = require('path')
const express = require('express') // express is just a function to create a new express application
const hbs = require('hbs')
const { geocode } = require('./utils/geocode')
const { forecast } = require('./utils/forecast')

const app = express()

const port = process.env.PORT || 3000
// paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set("views", viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath)) // it helps to link/serve html css js images

app.get('', (req, res) => {
    res.render("index", {
        title: "Weather App",
        username: "gracious"
    })
})

app.get('/about', (req, res) => {
    res.render("about", {
        "title": "About me",
        "username": "gracious"
    })
})

app.get('/help', (req, res) => {
    res.render("help", {
        "title": "Help Page",
        "username": "Xanxox xexe",
        "message": "Try contacting at nvoic12x@gmail.com"
    })
})
app.get("/weather", (req, res) => {
    if (!req.query.address){
        return res.send({
            message:"Address must be send"
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {})=> {
        if (error) {
            return res.send({
                error: error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
            return res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })
  
})



app.get('/help/*', (req, res) => {
    res.render("404.hbs", {
        "title": "404",
        message:"Help article not found",
        "username": "gracious"
    })
})
app.get('*', (req, res) => {
    res.render('404.hbs',{
        "title": "404",
        "message":"Page not found",
        "username":"gracious"
    } )
})
app.listen(port, () => {
    console.log("Server is up on port" + port)
})