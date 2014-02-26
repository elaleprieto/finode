angular.module("App").controller 'RegistrosController'
	, ['$scope', '$http', '$timeout', 'socket', 'Registro'
		, ($scope, $http, $timeout, socket, Registro) ->

	console.log 'ola'

	$scope.add = ->
		console.log $scope.registro
	
	socket.on 'registroAdded', (registro) ->
		# $scope.registro = Registro.query()
		# angular.forEach $scope.registro, (element) ->
		# 	if element._id is bichito._id
		# 		$scope.setColor element, {r: bichito.intensidadRojo, g: bichito.intensidadVerde, b: bichito.intensidadAzul}
		console.log registro


]