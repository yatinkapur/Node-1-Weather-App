// nodemon src/app.js  -e js, hbs

const express = require('express')
const path = require('path')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

//for deployment on Heroku || default value for local run
const port = process.env.PORT || 3000

// ################# DEFINE PATHS ######################
// console.log(__dirname)
//return current directory name
// console.log(__filename)
//return current file name

//console.log(path.join(__dirname, '../public '))
//gets the path and joins path public using ..


//##################  DEFINE PATH FOR EXPRESS CONFIG  #########################

const publicDirPath = path.join(__dirname, '../public')

//################## SET UP STATIC DIRECTORY TO SERVE #########################
app.use(express.static(publicDirPath))



// ################# SET UP HANDLEBARS VIEWS AND LOCATION #####################

//tell express which templating engine is installed - HBS(HandleBar)
app.set('view engine', 'hbs')

//customize the views directory to hbsTemplate
const viewsPath = path.join(__dirname, '../hbsTemplates/views')
app.set('views', viewsPath)

//registering partials with HandleBar
const partialPath = path.join(__dirname, '../hbsTemplates/partials')
hbs.registerPartials(partialPath)




//rendering dynamic HBS Template on Home Page
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App', //setting properties to be displayed on webpage
        name: 'Yatin'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page HBS',
        name: 'Yatin'
    })
})


//routes
// app.get('', (req, res) => {
//     //sending html
//     res.send('<h1>  WEATHER  </h1>')
// })

app.get('/help', (req, res) => {
    res.send({
        name: 'yatin',
        age: 27
    })
    //sending json

})

// app.get('/about', (req, res) => {
//     res.send([{
//         name: 'yatin'
//     },
//     {
//         name: 'kapur'
//     }])
//     //sending array of objects
// })

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'address must be provided'
            
        })
    }
    res.send({
        msg:'weather time',
        address: req.query.address
    })
    //sending text 
})


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        })
    }

    res.send({
        products: []
    })

})








//################################################################################################//
//############################### Code for Geocode and Forecast  //###############################//
//################################################################################################//

app.get('/weather-forecast',(req, res)=>{
    if(!req.query.address){
        return res.send({
            error: "you must provide the adderss"
        })
    }
    else{
        console.log(req.query.address);
    }

    geocode(req.query.address, (error, {latitude, longitude, location}={})=>{
        if(error){
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})






//################## wild routes ##################
app.get('/about/*', (req, res) => {
    // res.send('about article not found')
    res.render('404', {
        title: 'Error:404',
        name: 'Yatin',
        errorMsg: ' About Article Not Found'
    })

})

app.get('*', (req, res) => {
    // res.send('My 404 Page')
    res.render('404', {
        title: 'Error:404',
        name: 'Yatin',
        errorMsg: ' Page Not Found'
    })

})

// app.listen(3000, () => {
//     console.log('server is up on port 3000')
// })

app.listen(port, () => {
    console.log('server is up on port ' +port)
})