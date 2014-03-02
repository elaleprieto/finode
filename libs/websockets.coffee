module.exports = (servidor, cache, Registros) ->
	
	Cuentas = require('../models/cuenta')
	Registros = require('../models/registro')
	sio = require('socket.io')
	ws = sio.listen(servidor)

	ws.disable('log')
	# websocket, htmlfile, xhr-polling, jsonp-polling
	
	ws.on 'connection', (socket) ->
		socket.emit 'ready',{title: 'Ready'}

		socket.on 'imagen', (imagen) ->
			cache[imagen.id] = imagen.data
			socket.broadcast.emit('imagen', imagen)
		
		socket.on 'color', (color) ->
			# cache[imagen.id] = imagen.data
			console.log('Color: ', color)
			socket.broadcast.emit('color', color)

		 # socket.on 'colorChanged', (element, rgb) ->
			 # console.log('Elemento: ' + element, ', Color recibido: ' + rgb)
			 # socket.broadcast.emit('colorChanged', {element: element, rgb: rgb})
		socket.on 'colorChanged', (data) ->
			socket.broadcast.emit('colorChanged', data)

			Registros.edit({id: data.element
					, intensidadAzul: data.rgb.b
					, intensidadRojo: data.rgb.r
					, intensidadVerde: data.rgb.g})

		socket.on 'cambiarColor', (registro) ->
			socket.broadcast.emit('cambiarColor', registro)

			Registros.edit({id: registro._id
					, intensidadAzul: registro.intensidadAzul
					, intensidadRojo: registro.intensidadRojo
					, intensidadVerde: registro.intensidadVerde})

		socket.on 'add', (registro) ->
			socket.broadcast.emit('registroAdded', registro)

			Registros.add(registro)

		socket.on 'cuentaAdd', (cuenta) ->
			socket.broadcast.emit('cuentaAdded', cuenta)
			Cuentas.add(cuenta)

		socket.on 'registroAdd', (registro) ->
			socket.broadcast.emit('registroAdded', registro)
			Registros.add(registro)

