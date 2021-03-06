const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const weather = require('./utils/weather');

const app = express();
const port = process.env.PORT || 3000;
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
        return res.json({
            error: 'No address provided'
        });
    }
    geocode(req.query.address).then(data => {
        weather(data.latitude, data.longitude).then(data => {
            res.json(data);
        }).catch(error => res.json(error));
    }).catch(error => res.json(error));
});

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page not found',
        heading: '404'
    });
});

app.listen(port, () => {
    console.log('Server is listening in port ' + port);
});
