// var mongoose = require('mongoose');
var Database = require('./database');
// var ObjectId = mongoose.Types.ObjectId;
var ObjectId = Database.Types.ObjectId;
var objectId = {};
var Registros = {};
var RegistroSchema = {};
var SUS = {};
var schema = {};

// Base de datos MongoDB
// mongoose.connect('mongodb://localhost/finode', function (error) {
// 	if (!error) {
// 		schema = mongoose.Schema;
// 		objectId = schema.ObjectId;
// 		RegistroSchema = new schema({date: Date
// 			, number: String
// 			, beneficiary: String
// 			, notes: String
// 			, reconciled: Boolean
// 			, amount: Number
// 			, created: Date
// 			, modified: Date
// 			, credito_id: schema.Types.ObjectId
// 			, debito_id: schema.Types.ObjectId

// 			// orden: String,
// 			// direccion: String,
// 			// estado: String,
// 			// intensidadAzul: String,
// 			// intensidadRojo: String,
// 			// intensidadVerde: String
// 		});

// 		Registros = mongoose.model('registros', RegistroSchema);

// 		console.log('Conectado a MongoDB');
// 	} else {
// 		throw error;
// 	}
// })

schema = Database.Schema;
objectId = schema.ObjectId;
RegistroSchema = new schema({date: Date
	, number: String
	, beneficiary: String
	, notes: String
	, reconciled: Boolean
	, amount: Number
	, created: Date
	, modified: Date
	, credito_id: schema.Types.ObjectId
	, debito_id: schema.Types.ObjectId

	// orden: String,
	// direccion: String,
	// estado: String,
	// intensidadAzul: String,
	// intensidadRojo: String,
	// intensidadVerde: String
});

Registros = Database.model('registros', RegistroSchema);

console.log('Conectado a MongoDB');

module.exports = Registros;

// var Db = require('mongodb').Db;
// var Server = require('mongodb').Server;

// var dPort = 27017;
// var dHost = "localhost";
// var dName = "video5";

// var SUS = {};

// SUS.db = new Db(dName, new Server(dHost, dPort, {auto_reconnect: true},{}));
// SUS.db.open(function(e,d){
// 	if(e){
// 		console.log(e)
// 	}else{
// 		console.log("Conectado a la base de datos: "+dName);
// 	}
// });

// SUS.subscriptors = SUS.db.collection('subscriptors');

// module.exports = SUS;

// SUS.new = function(newData, callback){
// 	SUS.subscriptors.findOne({email: newData.email}, function(e,obj){
// 		if(obj){
// 			callback('Ese email ya existe.');
// 		}else{
// 			SUS.subscriptors.insert(newData, callback(null))
// 		}
// 	})
// }

Registros.add = function(registro, callback){
	// SUS.subscriptors.findOne({email: newData.email}, function(e,obj){
	// 	if(obj){
	// 		callback('Ese email ya existe.');
	// 	}else{
	// 		SUS.subscriptors.insert(newData, callback(null))
	// 	}
	// })
	Registros.create(registro, function (err, small) {
		if (err) return err;
		if (err) console.log(err);
		// saved!
	});
}

// Registros.find = function(callback){
// 	Registros.find({}, function (error, registros) {
// 		if(error){
// 			callback(error)
// 		}else{
// 			callback(null, registros)
// 		}
// 	});
// }

Registros.edit = function(dataRegistro, callback){
	Registros.findById(dataRegistro.id, function (error, registro) {
		registro.intensidadAzul = dataRegistro.intensidadAzul;
		registro.intensidadRojo = dataRegistro.intensidadRojo;
		registro.intensidadVerde = dataRegistro.intensidadVerde;
		registro.save(function (err) {
			if (err) {
				console.log(err);
			}
		});
	});
	// Registros.findByIdAndUpdate({_id: new ObjectId(nuevoRegistro.id)}, {intensidadAzul:'300'}, callback);
	// Registros.find({_id: new ObjectId(registro.id)}, {intensidadAzul:'1833'}, { upsert: true }, callback);
	
	
}

Registros.findByCuenta = function(cuenta, callback) {
	// Registros.find({debito_id: cuenta._id}, function (error, registros) {
	return Registros.find(
		{ $or: [
				{debito_id: cuenta._id},
				{credito_id: cuenta._id}
			]
		}

		, function (error, registros) {
			// console.log(registros);
			if (!error) {callback(null, registros);}
			else {callback(error)};
	});
}


SUS.delete = function(id, callback){
	SUS.subscriptors.remove({_id: this.getObjectId(id)},callback)
}


SUS.getObjectId = function(id){
	return SUS.subscriptors.db.bson_serializer.ObjectID.createFromHexString(id)
}

Registros.getObjectId = function(id){
	return ObjectID.createFromHexString(id)
}