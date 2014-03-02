
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var cuentas = require('./routes/cuentas');
var registros = require('./routes/registros');
var user = require('./routes/user');
var http = require('http');
// var mysql = require('mysql');
var path = require('path');

// Variables
var cache = {};
var websockets = require('./libs/websockets');

var app = express();

// Mysql
// var connection = mysql.createConnection({
// 	host: 'localhost',
// 	user: 'root',
// 	password: 'ale'
// })

// connection.connect();

// connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
// 	if(err) throw err;

// 	console.log('La solucion es: ', rows[0].solution);
// });

// connection.end();

// all environments
app.set('port', process.env.PORT || 3001);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// app.get('/', routes.index);
app.get('/', registros.registrar);
app.get('/registros', registros.index);
app.post('/registros', registros.add);
app.get('/cuentas', cuentas.index);
app.post('/cuentas', cuentas.add);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
  websockets(this, cache);
});
