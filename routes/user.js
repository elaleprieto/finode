
/*
 * GET users listing.
 */
var Users = require('../models/user');

exports.autenticate = function(req, res) {
	var req = req;

	Users.findOne({username: req.body.username}, function (error, user) {
		if(user && user.password == req.body.password) {
			req.session.User = {};
			req.session.User.username = user.username;
			req.session.User.name = user.name;
			res.redirect('/');
		}
		req.session = null;
		res.send('Datos incorrectos');
	});

	// if(req.body.username == 'ale' && req.body.password == 'ale') {
	// 	// // req.session = {}
	// 	req.session.user = req.body.username;
	// 	res.redirect('/');
	// 	// res.send(req.session);
	// 	// req.session.regenerate(function(){
	// 	// 	request.session.user = req.body.username;
	// 	// 	response.redirect('/restricted');
 //  //       });
	// } else {
	// 	req.session = {}
	// 	req.session.user = req.body.username;
	// 	res.send(req.body);
	// 	res.send('Datos incorrectos');
	// }
};

exports.list = function(req, res){
  res.send("respond with a resource");
};


exports.login = function(req, res){
  res.render('login', { title: 'FiNode :: Login' });
};

exports.logout = function(request, response) {
	request.session = null
	response.redirect('/');
    // request.session.destroy(function(){
    //     response.redirect('/');
    // });
};