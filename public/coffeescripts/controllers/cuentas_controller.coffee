angular.module("App").controller 'CuentasController'
	, ['$scope', '$http', '$timeout', 'socket', 'Cuenta'
		, ($scope, $http, $timeout, socket, Cuenta) ->

	Cuenta.query {}
		, (data) ->
			# Se elimina el nodo Root y se arman los datos del arbol
			treeData = []
			angular.forEach data, (cuenta, index) ->
				if cuenta.name is 'Root' 
					# data.splice(index, 1)
					treeData.push 
						"id": cuenta._id
						"parent": '#'
						"text" : cuenta.name
				else
					treeData.push 
						"id": cuenta._id
						"parent": cuenta.parent_id
						"text" : cuenta.name
						"data": cuenta

			$scope.cuentas = data

			$('#jstree_demo_div').jstree({'core': {'data': treeData}})
			$('#jstree_demo_div').on "changed.jstree", (e, data) ->
				cuenta = data.node.data
				$scope.cuentaSelected(cuenta)

			# console.log $('#jstree_demo_div').jstree().get_children_dom()
			$('#jstree_demo_div').on "ready.jstree", (e, data) ->
				# console.log data
				console.log $.jstree.reference('#jstree_demo_div').get_next()



			# # Se debe esperar a que estén situados los elementos en la vista para ejecutar jTree
			# $timeout ->
			# 	$('#jstree_demo_div').jstree()
			# 	$('#jstree_demo_div').on "changed.jstree", (e, data) ->
			# 		cuenta = data.node.data.$scope.cuenta
			# 		$scope.cuentaSelected(cuenta)
			# , 50

	$scope.add = ->
		if $scope.nuevaCuenta? and $scope.nuevaCuenta.name? and $scope.nuevaCuenta.parent?
			$scope.nuevaCuenta.parent_id = $scope.nuevaCuenta.parent._id
			socket.emit('cuentaAdd', $scope.nuevaCuenta)
			$scope.cuentas.push $scope.nuevaCuenta
			$('#crearCuenta').modal 'hide'
			$scope.nuevaCuenta = {}

	$scope.excludeCuentaSelected = (cuentaSelected) ->
		cuentas = angular.copy $scope.cuentas
		angular.forEach cuentas, (cuenta, index) ->
			if cuenta._id is cuentaSelected._id
				cuentas.splice index, 1
		cuentas

	$scope.cuentaSelected = (cuenta) ->
		$scope.$broadcast 'cuentaSelected', cuenta

	socket.on 'cuentaAdded', (cuenta) ->
		$scope.cuentas.push cuenta



]