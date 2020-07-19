var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
var fs = require('fs');
var dns = require('dns');

var app = express();

// Basic Configuration 
var port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
// mongoose.connect(process.env.DB_URI);

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
/** this project needs to parse POST bodies **/
// you should mount the body-parser here

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});

  
// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

const saveNotes = urls => {
    let short = JSON.parse(fs.readFileSync('./short.json'));
    short.push(urls);  
    let stringURLs = JSON.stringify(short);
    fs.writeFileSync('./short.json', stringURLs);
};

app.post('/api/shorturl/new', function(req, res){
  const given_url = req.body.url;
  let url = dns.lookup(given_url, (err, add) => {
    if (err) return undefined;
    return given_url;
  });
  if (url === 'undefined'){
    res.json({"error":"invalid URL"});
  } else {
    const short = Math.floor(Math.random()*100);
    let result = {original: given_url, short_url: short};
    saveNotes(result);
    res.json(result);  
  }
});

app.get('/shorturl/:short', function(req, res){
  const short = req.params.short;
  const shortUrls = JSON.parse(fs.readFileSync('./short.json'));
  let redirect = shortUrls.find(url => url.short_url == short);
  if (redirect){
    res.redirect(redirect.original_url);  
  } else {
    res.send('Not found');
  }
});

app.listen(port, function () {
  console.log('Node.js listening ...');
});
