
/*
 * GET home page.
 */

var Cuentas = require('../models/cuenta');

exports.registrar = function(req, res) {
  res.render('registrar', { title: 'FiNode' });
};


exports.add = function(req, res) {
	cuenta = req.body
	console.log(cuenta);
	Cuentas.add(cuenta);
	res.send();
	// Cuentas.find(function (error, registros) {
	// 	res.render('registros/index', {title: 'Listado', registros: registros});
	// })
};

exports.index = function(req, res) {
	if(!req.xhr) {
		res.render('cuentas/index');
	} else {
		Cuentas.find({}, function (error, cuentas) {
			if(error) {
				res.send(error);
			} else {
				res.json(cuentas);
			}
		});
	}
};

// exports.find = function(req, res) {
// 	Cuentas.find({}, function (error, cuentas) {
// 		if(error) {
// 			res.send(error);
// 		} else {
// 			res.json(cuentas);
// 		}
// 	});
// };