// var mongoose = require('mongoose');
var Database = require('./database');
var ObjectId = Database.Types.ObjectId;
var objectId = {};
var Cuentas = {};
var CuentaSchema = {};
var SUS = {};
var schema = {};

// Base de datos MongoDB
// mongoose.connect('mongodb://localhost/finode', function (error) {
// 	if (!error) {
// 		schema = mongoose.Schema;
// 		objectId = schema.ObjectId;
// 		CuentaSchema = new schema({name: String
// 			, description: String
// 			, type_id: schema.Types.ObjectId
// 			, parent_id: schema.Types.ObjectId

// 			// orden: String,
// 			// direccion: String,
// 			// estado: String,
// 			// intensidadAzul: String,
// 			// intensidadRojo: String,
// 			// intensidadVerde: String
// 		});

// 		Cuentas = mongoose.model('cuentas', CuentaSchema);

// 		console.log('Conectado a MongoDB');
// 	} else {
// 		throw error;
// 	}
// })


schema = Database.Schema;
objectId = schema.ObjectId;
CuentaSchema = new schema({name: String
	, description: String
	, type_id: schema.Types.ObjectId
	, parent_id: schema.Types.ObjectId

	// orden: String,
	// direccion: String,
	// estado: String,
	// intensidadAzul: String,
	// intensidadRojo: String,
	// intensidadVerde: String
});

Cuentas = Database.model('cuentas', CuentaSchema);

console.log('Conectado a MongoDB');

module.exports = Cuentas;

// var Db = require('mongodb').Db;
// var Server = require('mongodb').Server;

// var dPort = 27017;
// var dHost = "localhost";
// var dName = "video5";

// var SUS = {};

// SUS.db = new Db(dName, new Server(dHost, dPort, {auto_reconnect: true},{}));
// SUS.db.open(function(e,d) {
// 	if(e) {
// 		console.log(e)
// 	}else{
// 		console.log("Conectado a la base de datos: "+dName);
// 	}
// });

// SUS.subscriptors = SUS.db.collection('subscriptors');

// module.exports = SUS;

// SUS.new = function(newData, callback) {
// 	SUS.subscriptors.findOne({email: newData.email}, function(e,obj) {
// 		if(obj) {
// 			callback('Ese email ya existe.');
// 		}else{
// 			SUS.subscriptors.insert(newData, callback(null))
// 		}
// 	})
// }

Cuentas.add = function(cuenta, callback) {
	// SUS.subscriptors.findOne({email: newData.email}, function(e,obj) {
	// 	if(obj) {
	// 		callback('Ese email ya existe.');
	// 	}else{
	// 		SUS.subscriptors.insert(newData, callback(null))
	// 	}
	// })
	Cuentas.create(cuenta, function (err, small) {
		if (err) return handleError(err);
		// saved!
	});
}

// Cuentas.find = function(callback) {
// 	Cuentas.find({}, function (error, cuentas) {
// 		if(error) {
// 			callback(error)
// 		}else{
// 			callback(null, cuentas)
// 		}
// 	});
// }

Cuentas.edit = function(dataCuenta, callback) {
	Cuentas.findById(dataCuenta.id, function (error, cuenta) {
		cuenta.intensidadAzul = dataCuenta.intensidadAzul;
		cuenta.intensidadRojo = dataCuenta.intensidadRojo;
		cuenta.intensidadVerde = dataCuenta.intensidadVerde;
		cuenta.save(function (err) {
			if (err) {
				console.log(err);
			}
		});
	});
	// Cuentas.findByIdAndUpdate({_id: new ObjectId(nuevoRegistro.id)}, {intensidadAzul:'300'}, callback);
	// Cuentas.find({_id: new ObjectId(cuenta.id)}, {intensidadAzul:'1833'}, { upsert: true }, callback);
	
	
}

SUS.delete = function(id, callback) {
	SUS.subscriptors.remove({_id: this.getObjectId(id)},callback)
}


SUS.getObjectId = function(id) {
	return SUS.subscriptors.db.bson_serializer.ObjectID.createFromHexString(id)
}