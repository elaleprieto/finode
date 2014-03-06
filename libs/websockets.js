(function() {
  module.exports = function(servidor, cache, Registros) {
    var Cuentas, sio, ws;
    Cuentas = require('../models/cuenta');
    Registros = require('../models/registro');
    sio = require('socket.io');
    ws = sio.listen(servidor);
    ws.disable('log');
    return ws.on('connection', function(socket) {
      socket.emit('ready', {
        title: 'Ready'
      });
      socket.on('imagen', function(imagen) {
        cache[imagen.id] = imagen.data;
        return socket.broadcast.emit('imagen', imagen);
      });
      socket.on('color', function(color) {
        console.log('Color: ', color);
        return socket.broadcast.emit('color', color);
      });
      socket.on('colorChanged', function(data) {
        socket.broadcast.emit('colorChanged', data);
        return Registros.edit({
          id: data.element,
          intensidadAzul: data.rgb.b,
          intensidadRojo: data.rgb.r,
          intensidadVerde: data.rgb.g
        });
      });
      socket.on('cambiarColor', function(registro) {
        socket.broadcast.emit('cambiarColor', registro);
        return Registros.edit({
          id: registro._id,
          intensidadAzul: registro.intensidadAzul,
          intensidadRojo: registro.intensidadRojo,
          intensidadVerde: registro.intensidadVerde
        });
      });
      socket.on('add', function(registro) {
        socket.broadcast.emit('registroAdded', registro);
        return Registros.add(registro);
      });
      socket.on('cuentaAdd', function(cuenta) {
        socket.broadcast.emit('cuentaAdded', cuenta);
        return Cuentas.add(cuenta);
      });
      socket.on('registroAdd', function(registro) {
        socket.broadcast.emit('registroAdded', registro);
        return Registros.add(registro);
      });
      return socket.on('registrosFindByCuenta', function(cuenta) {
        console.log(cuenta._id);
        return Registros.findByCuenta(cuenta, function(error, registos) {
          if (!error) {
            return socket.emit('registrosFindByCuenta', registos);
          } else {
            return console.log(error);
          }
        });
      });
    });
  };

}).call(this);
