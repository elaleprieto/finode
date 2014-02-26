var mongoose = Database = require('mongoose');

// Base de datos MongoDB
mongoose.connect('mongodb://localhost/finode', function (error) {
	if (error) {
		throw error;
	}
})

module.exports = Database;
