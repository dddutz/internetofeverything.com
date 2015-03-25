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
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
	    client.query('SELECT * FROM test_table', function(err, result) {
	    	done();
	      	if (err) { 
	      		console.error(err); 
	      		response.send("Error " + err); 
	      	} else { 
	      		response.send(result.rows); 
	      	}
	    });
	});
});

module.exports = router;