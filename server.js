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


/* this will come from the database */
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

var chicken = [
	{ 	
		name: "1/4 Roast Chicken and Chips", 
		price: 470,
	},
	{ 	
		name: "1/4 Roast Chicken and Rice", 
		price: 650,
	},
	{ 	
		name: "Bella Special - Marinated breast of chicken served with salad or chips", 
		price: 750,
	},
	{ 	
		name: "Chicken Nuggets (5 pieces)", 
		price: 220,
	},
	{ 	
		name: "Chicken Nuggets (10 pieces)", 
		price: 440,
	},
	{ 	
		name: "Hot Wings (8 pieces)", 
		price: 470,
	},
	{ 	
		name: "Chicken Wrap", 
		price: 450,
	}
];

var kids = [
	{ 	
		name: "Sausage and Chips", 
		price: 270,
	},
	{ 	
		name: "5 Chicken Nuggets and Chips", 
		price: 370,
	},
	{ 	
		name: "Kids Pasta (choice from main menu)", 
		price: 470,
	},
	{ 	
		name: "Kids Risotto (choice from main menu)", 
		price: 470,
	}
];

var starters = [
	{ 	
		name: "Chicken Salad.", 
		price: 400,
	},
	{ 	
		name: "Tuna Salad", 
		price: 400,
	},
	{ 	
		name: "Side Salad", 
		price: 250,
	},
	{ 	
		name: "Garlic Mushrooms", 
		price: 270,
	},
	{ 	
		name: "Onion Rings (10 pieces).", 
		price: 220,
	},
	{ 	
		name: "Calamari (10 pieces served on a bed of lettuce)", 
		price: 280,
	},
	{ 	
		name: "Pitta Bread", 
		price: 40,
	},
	{ 	
		name: "Garlic Bread", 
		price: 250,
	},
	{ 	
		name: "Garlic Bread with Cheese", 
		price: 350,
	},
	{ 	
		name: "Chips (regular", 
		price: 150,
	},
	{ 	
		name: "Chips and Salad.", 
		price: 340,
	},
	{ 	
		name: "Chips and Mozzarella", 
		price: 290,
	},
	{ 	
		name: "Chips and Bolognese", 
		price: 440,
	},
	{ 	
		name: "Chips in Pitta", 
		price: 190,
	},
	{ 	
		name: "Salad in Pitta Bread", 
		price: 290,
	},
	{ 	
		name: "Sausage and Chips", 
		price: 260,
	},
	{ 	
		name: "Extra Sauce(Tomato, Mayo, Garlic, Chilli, BBQ)", 
		price: 80,
	}
];


/* api */

app.get('/api/getMenu', function(req, res) {  

	console.log("get menu");
	
	res.send({
		chicken: chicken,
		kids: kids,
		starters: starters
	});
});

app.get('/api/getOrders', function(req, res) {  

	var now = moment().format('DD-MMM-YYYY hh:mm:ss');

	console.log("get order at ", now)
	
	res.send(orders);
});


app.post('/api/makeOrder', function(req, res) {  

	var now = moment();

	console.log("now", now);
	console.log("user", req.body.user);
	console.log("order ", req.body.order);

	orders.push({ 
		user: req.body.user, 
		order: req.body.order,
		date: now.format("DD-MMM-YYYY"),
		time: now.format("hh:mm:ss"),
		status: "preparing"
	});

	res.send("order successfully placed at" + now);
});



// /* start server */

server.listen(PORT);  

var host = server.address().address
var port = server.address().port

console.log("bella napoli server listening on port %s", port);
