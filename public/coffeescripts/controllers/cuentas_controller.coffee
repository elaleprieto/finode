angular.module("App").controller 'CuentasController'
	, ['$scope', '$http', '$timeout', 'socket', 'Cuenta'
		, ($scope, $http, $timeout, socket, Cuenta) ->

	$scope.cuentas = Cuenta.query()

	$scope.add = ->
		console.log $scope.cuenta
	
	socket.on 'cuentaAdded', (cuenta) ->
		# $scope.cuenta = Cuenta.query()
		# angular.forEach $scope.cuenta, (element) ->
		# 	if element._id is bichito._id
		# 		$scope.setColor element, {r: bichito.intensidadRojo, g: bichito.intensidadVerde, b: bichito.intensidadAzul}
		console.log cuenta


]