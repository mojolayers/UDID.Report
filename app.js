
/**
 * Module dependencies.
 */

 var express = require('express')
 , routes = require('./routes')
 , mobconf = require('./routes/mobileconfig')
 , http = require('http')
 , path = require('path');
 
var cookieParser = require('cookie-parser')
const helmet = require("helmet");
var cons = require('consolidate');

var app = express();

// all environments
app.set('port', process.env.PORT || 3001);

// Setup our View Engine
app.engine('html', cons.swig)
app.set('views', path.join(__dirname, 'views')); // Setup Views Folder Soon, for now - render www/
app.set('view engine', 'html'); // Set our "view" engine to HTML - Probably switching to Jade or Pug.

app.use(cookieParser(process.env.COOKIE_KEY || 'f76210bc2acc4f54af5754e15b0aab05'));
app.use(express.static(path.join(__dirname, 'www')));
app.use(express.raw({
 'type' : 'application/pkcs7-signature'
}))

app.use(helmet({
 hsts : {
   preload: true,
   maxAge: 31536000,
   includeSubDomains: true
 }
}))

app.get('/', routes.index);

app.post('/validate', mobconf.validate);
app.get('/paper_plane', mobconf.paper_plane);
app.get('/app', routes.index);


http.createServer(app).listen(app.get('port'), function(){
 console.log('Express server listening on port ' + app.get('port'));
});
