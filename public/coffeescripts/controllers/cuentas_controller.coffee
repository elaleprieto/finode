angular.module("App").controller 'CuentasController'
	, ['$scope', '$http', '$timeout', 'socket', 'Cuenta'
		, ($scope, $http, $timeout, socket, Cuenta) ->

	$scope.cuentas = Cuenta.query()

	$scope.add = ->
		if $scope.nuevaCuenta? and $scope.nuevaCuenta.name? and $scope.nuevaCuenta.parent?
			$scope.nuevaCuenta.parent_id = $scope.nuevaCuenta.parent._id
			socket.emit('cuentaAdd', $scope.nuevaCuenta)
			$scope.cuentas.push $scope.nuevaCuenta
			$('#crearCuenta').modal 'hide'
			$scope.nuevaCuenta = {}

	
	socket.on 'cuentaAdded', (cuenta) ->
		$scope.cuentas.push cuenta

]