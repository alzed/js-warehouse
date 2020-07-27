'use strict';

var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
var dns = require('dns');
var dotenv = require(dotenv);

var app = express();
dotenv.config();

// Basic Configuration 
var port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
/** this project needs to parse POST bodies **/
// you should mount the body-parser here

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});

app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

const urlSchema = new mongoose.Schema({
  original: { type: String, required: true },
  short_url: { type: String, required: true, unique: true }
});

const Shorturl = mongoose.model('Shorturl', urlSchema);

app.post('/api/shorturl/new', function(req, res, done){
  const given_url = req.body.url;
  let url = dns.lookup(given_url, (err, add) => {
    if (err) return undefined;
    return given_url;
  })
  if (url === 'undefined'){
    res.json({"error":"invalid URL"});
  } else {
    const short = Math.floor(Math.random()*100);
    var shortUrl = new Shorturl({original: given_url, short_url: short});
    shortUrl.save((err, data) => {
      if (err) return done(err);
      console.log(data);
      res.json({original: data.original, short_url: data.short_url});
      done(null, data);
    });
  }
});

app.get('/api/shorturl/:short', function(req, res, done){
  const short = req.params.short;
  Shorturl.findOne({short_url: short}, function(err, data){
    if (err) return done(err);
    res.redirect(data.original);
    done(null, data);
  })
});

app.listen(port, function () {
  console.log('Node.js listening ...');
});
