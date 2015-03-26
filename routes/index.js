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

/* GET userlist page. */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e, docs) {
        res.render('userlist', {
            "userlist" : docs
        });
    });
});

/* GET new user page */
router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
});

/* POST to Add User Service */
router.post('/adduser', function(req, res) {
    console.log('started');

    // Set our internal DB variable
    var db = req.db;

    console.log('got db');

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userEmail = req.body.useremail;

    console.log('got here');

    // Set our collection
    var collection = db.get('usercollection');

    console.log('got here yo');

    // Submit to the DB
    collection.insert({
        "username" : userName,
        "email" : userEmail
    }, function (err, doc) {
        if (err) {
            console.log("--- ERROR ---");
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            console.log("--- NO ERROR ---");
            // If it worked, set the header so the address bar doesn't still say /adduser
            res.location("userlist");
            // And forward to success page
            res.redirect("userlist");
        }
    });
});

/* GET database page. */
router.get('/database', function(req, res) {
    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
        client.query('SELECT * FROM users', function(err, result) {
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