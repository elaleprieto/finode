
/*
 * GET home page.
 */

var Registros = require('../models/registro');

exports.registrar = function(req, res) {
  res.render('registrar', { title: 'FiNode' });
};


exports.add = function(req, res) {
	registro = req.body
	console.log(registro);
	Registros.add(registro);
	res.send();
	// Registros.find(function (error, registros) {
	// 	res.render('registros/index', {title: 'Listado', registros: registros});
	// })
};