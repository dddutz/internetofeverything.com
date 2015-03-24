/* Module dependencies */
var express = require('express');
var stylus = require('stylus');
var nib = require('nib');

var app = express();
function compile(str, path) {
	return stylus(str).set('filename', path).use(nib());
}

app.set('port', (process.env.PORT || 5000));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(stylus.middleware( { src: __dirname + '/public', compile: compile }));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.render('index', { title : 'Home' });
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});