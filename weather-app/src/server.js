const express = require('express');
const path = require('path');
const hbs = require('hbs');

const app = express();

const staticPath = path.join(__dirname, '../static'); 
const viewsPath = path.join(__dirname, '../templates/views');

app.set('view engine', 'hbs');
app.set('views', viewsPath);

app.use(express.static(staticPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app'
    });
});

app.listen(5000, () => {
    console.log('Server is listening');
});
