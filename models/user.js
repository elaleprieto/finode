// var mongoose = require('mongoose');
var Database = require('./database');
// var ObjectId = mongoose.Types.ObjectId;
var ObjectId = Database.Types.ObjectId;
var objectId = {};
var Users = {};
var UserSchema = {};
var SUS = {};
var schema = {};

// Base de datos MongoDB
// mongoose.connect('mongodb://localhost/finode', function (error) {
// 	if (!error) {
// 		schema = mongoose.Schema;
// 		objectId = schema.ObjectId;
// 		UserSchema = new schema({date: Date
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

// 		Users = mongoose.model('users', UserSchema);

// 		console.log('Conectado a MongoDB');
// 	} else {
// 		throw error;
// 	}
// })

schema = Database.Schema;
objectId = schema.ObjectId;
UserSchema = new schema({username: String
	, password: String
	, name: String
	, created: Date
	, modified: Date
});

Users = Database.model('users', UserSchema);

console.log('Conectado a User en MongoDB');

module.exports = Users;

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

Users.add = function(user, callback){
	// SUS.subscriptors.findOne({email: newData.email}, function(e,obj){
	// 	if(obj){
	// 		callback('Ese email ya existe.');
	// 	}else{
	// 		SUS.subscriptors.insert(newData, callback(null))
	// 	}
	// })
	Users.create(user, function (err, small) {
		if (err) return err;
		if (err) console.log(err);
		// saved!
	});
}

// Users.find = function(callback){
// 	Users.find({}, function (error, users) {
// 		if(error){
// 			callback(error)
// 		}else{
// 			callback(null, users)
// 		}
// 	});
// }

Users.edit = function(dataUser, callback){
	Users.findById(dataUser.id, function (error, user) {
		user.intensidadAzul = dataUser.intensidadAzul;
		user.intensidadRojo = dataUser.intensidadRojo;
		user.intensidadVerde = dataUser.intensidadVerde;
		user.save(function (err) {
			if (err) {
				console.log(err);
			}
		});
	});
	// Users.findByIdAndUpdate({_id: new ObjectId(nuevoUser.id)}, {intensidadAzul:'300'}, callback);
	// Users.find({_id: new ObjectId(user.id)}, {intensidadAzul:'1833'}, { upsert: true }, callback);
	
	
}

Users.findByCuenta = function(cuenta, callback) {
	// Users.find({debito_id: cuenta._id}, function (error, users) {
	return Users.find(
		{ $or: [
				{debito_id: cuenta._id},
				{credito_id: cuenta._id}
			]
		}

		, function (error, users) {
			// console.log(users);
			if (!error) {callback(null, users);}
			else {callback(error)};
	});
}


SUS.delete = function(id, callback){
	SUS.subscriptors.remove({_id: this.getObjectId(id)},callback)
}


SUS.getObjectId = function(id){
	return SUS.subscriptors.db.bson_serializer.ObjectID.createFromHexString(id)
}

Users.getObjectId = function(id){
	return ObjectID.createFromHexString(id)
}