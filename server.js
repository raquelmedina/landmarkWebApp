var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();
var port = 8080;


app.use(bodyParser.json({ type: 'application/*+json' }));

app.use(express.static(`${__dirname}/public`));

app.get('/', function(req, res){
	res.sendFile(`${__dirname}/public/index.html`);
});

//proxy for google maps
app.get('/api-places', function(req, res){
	var baseUrl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
	var url = req.url.replace(req.path, baseUrl);
	request(url, function(err, response, body){
		if(err){
			return res.json(err);
		}

		if(body) {
			body = JSON.parse(body);
		}

		res.json(body);
	});
});

app.listen(port, function(){
	console.log('listening on localhost:8080');
});