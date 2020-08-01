const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const weather = require('./utils/weather');

const app = express();

const staticPath = path.join(__dirname, '../static'); 
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(staticPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'No address provided'
        });
    }
    geocode(req.query.address).then(data => {
        weather(data.latitude, data.longitude).then(data => {
            res.render('weather', {data: data});
        }).catch(error => res.json({'error': error}));
    }).catch(error => res.json({'error': error}));
});

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page not found',
        heading: '404'
    });
});

app.listen(3000, () => {
    console.log('Server is listening in port 3000');
});
