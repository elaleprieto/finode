
/*
 * GET home page.
 */

var Registros = require('../models/registro');

capitalize = function(string) {
	return string.charAt(0).toUpperCase() + string.substring(1);
}

exports.registrar = function(req, res) {
	res.render('registrar', { title: 'FiNode', user: capitalize(req.session.user) });
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

exports.index = function(req, res) {
	if(!req.xhr) {
		res.render('registros/index');
	} else {
		Registros.find({}, function (error, registros) {
			if(error) {
				res.send(error);
			} else {
				res.json(registros);
			}
		});
	}
};