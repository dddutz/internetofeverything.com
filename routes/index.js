var express = require('express');
var router = express.Router();

var pg = require('pg');

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', { title: 'Home' });
});

/* GET hackathon page. */
router.get('/hackathon', function(req, res) {
  res.render('hackathon', { title : 'Hackathon' });
});

/* GET database page. */
router.get('/database', function(req, res) {
	console.log("--- DATABASE URL ---");
	console.log(process.env.DATABASE_URL);
	console.log("--- END ---");
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
	    client.query('SELECT * FROM test_table', function(err, result) {
	    	done();
	      	if (err) { 
	      		console.error(err); 
	      		res.send("Error " + err); 
	      	} else { 
	      		res.send(result.rows); 
	      	}
	    });
	});
});

module.exports = router;