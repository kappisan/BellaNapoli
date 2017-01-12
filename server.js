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

app.use(express.static(__dirname + '/'));  

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


var orders = [
	{ 
		id: "abc1234",
		user: "bob", 
		order: ["margerita", "pepperoni", "onion rings"],
		date: "12-Jan-2017",
		time: "12:22:34",
		status: "preparing"
	}
];


/* api */

app.get('/api/getOrders', function(req, res) {  

	var now = moment().format('DD-MMM-YYYY hh:mm:ss');

	console.log("get order at ", now)
	
	res.send(orders);
});


app.post('/api/makeOrder', function(req, res) {  

	var now = moment().format('DD-MMM-YYYY hh:mm:ss');

	console.log("now", now);
	console.log("user", req.body.user);
	console.log("pizza ", req.body.pizza);

	orders.push({ 
		user: "barry", 
		order: ["margerita", "pepperoni", "onion rings"],
		date: "12-Jan-2017",
		time: "12:22:34"
	});

	res.send("order successfully placed at" + now);
});



// /* start server */

server.listen(PORT);  

var host = server.address().address
var port = server.address().port

console.log("bella napoli server listening on port %s", port);
