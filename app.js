/* Module dependencies */
var express = require('express');
var path = require('path');
var stylus = require('stylus');
var nib = require('nib');

var routes = require('./routes/index.js');

var app = express();

function compile(str, path) {
	return stylus(str).set('filename', path).use(nib());
}

app.set('port', (process.env.PORT || 5000));

// view engine setup
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(stylus.middleware( { src: __dirname + '/public', compile: compile }));

// Tells express to serve static objects from the /public directory, but make
// them seem like they're coming from the top level.
app.use(express.static(__dirname + '/public'));

app.use('/', routes);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});

module.exports = app;

// app.get('/', function(request, response) {
//   response.render('index', { title : 'Home' });
// });

// app.get('/hackathon', function(request, response) {
//   response.render('hackathon', { title : 'Hackathon' });
// });