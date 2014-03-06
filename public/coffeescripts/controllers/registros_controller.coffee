angular.module("App").controller 'RegistrosController'
	, ['$scope', '$http', '$timeout', 'socket', 'Registro'
		, ($scope, $http, $timeout, socket, Registro) ->

	$scope.registros = Registro.query()
	$scope.cuentaSelected = {}

	$scope.add = ->
		if $scope.registro? and $scope.registro.beneficiary? and $scope.registro.credito_id? and $scope.registro.debito_id? and $scope.registro.amount?
			# $scope.registro.parent_id = $scope.registro.parent._id
			socket.emit('registroAdd', $scope.registro)
			$scope.registros.push $scope.registro
			# $('#crearCuenta').modal 'hide'
			$scope.registro = {}
	
	$scope.$on 'cuentaSelected', (event, cuenta) ->
		console.log 'Cuenta: ', cuenta
		$scope.cuentaSelected = cuenta
		socket.emit('registrosFindByCuenta', cuenta)

	socket.on 'registroAdded', (registro) ->
		$scope.registros.push registro

	socket.on 'registrosFindByCuenta', (registros) ->
		console.log 'Registros: ', registros
		$scope.registros = registros
		calcularTotales()


	calcularTotales = ->
		angular.forEach $scope.registros, (registro, index) ->
			if index isnt 0
				if $scope.cuentaSelected._id is registro.credito_id
					registro.total = $scope.registros[index-1].total + registro.amount
				else
					registro.total = $scope.registros[index-1].total - registro.amount
			else
				if $scope.cuentaSelected._id is registro.credito_id
					registro.total = registro.amount
				else
					registro.total = -registro.amount



]