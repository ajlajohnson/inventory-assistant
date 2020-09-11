"use strict";

// require the express module
const express = require("express");

// create a new Router object
const routes = express.Router();

// import our connection file to make queries to our database
const pool = require("./connection");

// routes.get("/cart-items", (req, res) => {
// 	pool.query("SELECT * FROM inventory").then(response => {
// 		res.json(response.rows);
// 	});
// });


routes.get("/cart-items", (req, res) => {
	if (req.query.maxPrice) {
		let maxPrice = req.query.maxPrice;
		pool.query("SELECT * FROM inventory").then(response => {
			res.json(response.rows);
		});
	} else if (req.query.prefix) {
		let prefix = req.query.prefix.toLowerCase();
		pool.query(`SELECT * FROM inventory WHERE LOWER(product) SIMILAR TO '${prefix}%'`).then(response => {
			res.json(response.rows);
		});
	} else if (req.query.pageSize) {
		let pageSize = parseInt(req.query.pageSize);
		pool.query(`SELECT * FROM inventory LIMIT ${pageSize}`).then(response => {
			res.json(response.rows);
		});
	} else {
		pool.query("SELECT * FROM inventory").then(response => {
			res.json(response.rows);
		});
	};
});


routes.post("/cart-items", (req, res) => {
	let queryString = `INSERT INTO inventory(product, price, quantity) 
	VALUES 
	($1::VARCHAR, $2::DECIMAL, $3::SMALLINT)`;

	pool.query(queryString, [req.body.product, req.body.price, req.body.quantity]).then((response) => {
		res.json(req.body);
	});
});

routes.delete("/cart-items", (req, res) => {
	let id = req.params.id;
	let queryString = `DELETE FROM inventory WHERE id = ${req.body.id}`;
	console.log(queryString);
	res.sendStatus(204);
});


routes.put("/cart-items/:id", (req, res) => {
	let id = req.params.id;
	let body = req.body;
	let queryString = `UPDATE inventory SET price=$1::DECIMAL, quantity=$2::SMALLINT WHERE id=${id}`;
	pool.query(queryString, [body.price, body.quantity]).then((response) => {
		res.json(res.body);
	});
});




// routes.get("/cart-items", (req, res) => {
// 	if (req.query.maxPrice) {
// 		let filteredArray = items.filter((item) => {
// 			return item.price <= parseFloat(req.query.maxPrice);
// 		});
// 		res.status(200);
// 		res.json(filteredArray);
// 	} else if (req.query.prefix) {
// 		let filteredArray = items.filter((item) => {
// 			let currentItem = item.product.toLowerCase();
// 			return currentItem.startsWith(req.query.prefix.toLowerCase());
// 		});
// 		res.status(200);
// 		res.json(filteredArray);
// 	} else if (req.query.pageSize) {
// 		let pageSize = parseInt(req.query.pageSize);
// 		let results = items.slice(0, pageSize);
// 		res.status(200);
// 		res.json(results);
// 	} else {
// 		res.status(200);
// 		res.json(items);
// 	}
// });

// routes.get("/cart-items/:id", (req, res) => {
// 	let id = parseInt(req.params.id);
// 	let found = items.find((item) => {
// 		return item.id === id;
// 	});
// 	if (found) {
// 		res.status(200);
// 		res.json(found);
// 	} else {
// 		res.status(404);
// 		res.send(`ID ${id} not found`);
// 	}
// });

// routes.post("/cart-items", (req, res) => {
// 	const item = req.body;
// 	item.id = nextId++;
// 	items.push(item);
// 	res.status(201);
// 	res.json(item);
// });

// routes.put("/cart-items/:id", (req, res) => {
// 	let id = parseInt(req.params.id);
// 	let index = items.findIndex((item) => {
// 		return item.id === id;
// 	});
// 	items[index] = req.body;
// 	items[index].id = id;
// 	res.status(200);
// 	res.json(items[index]);
// });

// routes.delete("/cart-items/:id", (req, res) => {
// 	let id = parseInt(req.params.id);
// 	let index = items.findIndex((item) => {
// 		return item.id === id;
// 	});
// 	items.splice(index, 1);
// 	res.sendStatus(204);
// });

// export routes to use in server.js


module.exports = routes;
