(function() {
  angular.module("App").controller('CuentasController', [
    '$scope', '$http', '$timeout', 'socket', 'Cuenta', function($scope, $http, $timeout, socket, Cuenta) {
      Cuenta.query({}, function(data) {
        var treeData;
        treeData = [];
        angular.forEach(data, function(cuenta, index) {
          if (cuenta.name === 'Root') {
            return treeData.push({
              "id": cuenta._id,
              "parent": '#',
              "text": cuenta.name
            });
          } else {
            return treeData.push({
              "id": cuenta._id,
              "parent": cuenta.parent_id,
              "text": cuenta.name,
              "data": cuenta
            });
          }
        });
        $scope.cuentas = data;
        $('#jstree_demo_div').jstree({
          'core': {
            'data': treeData
          }
        });
        $('#jstree_demo_div').on("changed.jstree", function(e, data) {
          var cuenta;
          cuenta = data.node.data;
          return $scope.cuentaSelected(cuenta);
        });
        return $('#jstree_demo_div').on("ready.jstree", function(e, data) {
          return console.log($.jstree.reference('#jstree_demo_div').get_next());
        });
      });
      $scope.add = function() {
        if (($scope.nuevaCuenta != null) && ($scope.nuevaCuenta.name != null) && ($scope.nuevaCuenta.parent != null)) {
          $scope.nuevaCuenta.parent_id = $scope.nuevaCuenta.parent._id;
          socket.emit('cuentaAdd', $scope.nuevaCuenta);
          $scope.cuentas.push($scope.nuevaCuenta);
          $('#crearCuenta').modal('hide');
          return $scope.nuevaCuenta = {};
        }
      };
      $scope.excludeCuentaSelected = function(cuentaSelected) {
        var cuentas;
        cuentas = angular.copy($scope.cuentas);
        angular.forEach(cuentas, function(cuenta, index) {
          if (cuenta._id === cuentaSelected._id) {
            return cuentas.splice(index, 1);
          }
        });
        return cuentas;
      };
      $scope.cuentaSelected = function(cuenta) {
        return $scope.$broadcast('cuentaSelected', cuenta);
      };
      return socket.on('cuentaAdded', function(cuenta) {
        return $scope.cuentas.push(cuenta);
      });
    }
  ]);

}).call(this);
