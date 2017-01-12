const PORT=5000; 

// app.js
var express = require('express');  
var app = express();  
var server = require('http').createServer(app);  
var io = require('socket.io')(server);
var bodyParser = require('body-parser');
var moment = require('moment');
var numeral = require('numeral');
var _ = require('underscore');
var MongoClient = require('mongodb').MongoClient;

app.use(express.static(__dirname + '/client'));  

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));



/* api */
var startDate = moment("01-Jan-14", "DD-MMM-YY");

app.get('/api/getOrders', function(req, res) {  

	var now = moment().format('DD-MMM-YYYY hh:mm:ss');

	console.log("get order at ", now)
	
	res.send(now);
});


app.post('/api/makeOrder', function(req, res) {  

	var now = moment().format('DD-MMM-YYYY hh:mm:ss');

	console.log("now", now);
	console.log("user", req.body.user);
	console.log("pizza ", req.body.pizza);

	res.send("order successfully placed at" + now);
});



// /* start server */

server.listen(PORT);  

var host = server.address().address
var port = server.address().port

console.log("stock simulator server listening on port %s", port);
