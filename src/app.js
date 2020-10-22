const express = require('express');
const path = require('path');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Braath1'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Braath1'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'You can get help bro!',
        name: 'Braath1'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        });
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }

    console.log(req.query.search);
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Help article not found',
        name: 'Braath1'
    });
});

// * is match everything that hasn`t been matched so far. Has to be the last route before listen.
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: '404 page not found',
        name: 'Braath1',
    });
});

app.listen(port, () => {
    console.log('App is running on port ' + port);
});