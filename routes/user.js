
/*
 * GET users listing.
 */

exports.autenticate = function(req, res){
	if(req.body.username == 'ale' && req.body.password == 'ale') {
		// // req.session = {}
		req.session.user = req.body.username;
		res.redirect('/');
		// res.send(req.session);
		// req.session.regenerate(function(){
		// 	request.session.user = req.body.username;
		// 	response.redirect('/restricted');
  //       });
	} else {
		req.session = {}
		req.session.user = req.body.username;
		res.send(req.body);
		res.send('Datos incorrectos');
	}
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