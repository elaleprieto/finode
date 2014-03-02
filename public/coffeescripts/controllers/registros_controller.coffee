angular.module("App").controller 'RegistrosController'
	, ['$scope', '$http', '$timeout', 'socket', 'Registro'
		, ($scope, $http, $timeout, socket, Registro) ->

	$scope.registros = Registro.query()

	$scope.add = ->
		if $scope.registro? and $scope.registro.beneficiary? and $scope.registro.credito_id? and $scope.registro.debito_id? and $scope.registro.amount?
			# $scope.registro.parent_id = $scope.registro.parent._id
			socket.emit('registroAdd', $scope.registro)
			$scope.registros.push $scope.registro
			# $('#crearCuenta').modal 'hide'
			$scope.registro = {}
	
	socket.on 'registroAdded', (registro) ->
		# $scope.registro = Registro.query()
		# angular.forEach $scope.registro, (element) ->
		# 	if element._id is bichito._id
		# 		$scope.setColor element, {r: bichito.intensidadRojo, g: bichito.intensidadVerde, b: bichito.intensidadAzul}
		$scope.registros.push registro


]