(function() {
  angular.module("App").controller('CuentasController', [
    '$scope', '$http', '$timeout', 'socket', 'Cuenta', function($scope, $http, $timeout, socket, Cuenta) {
      $scope.cuentas = Cuenta.query();
      $scope.add = function() {
        if (($scope.nuevaCuenta != null) && ($scope.nuevaCuenta.name != null) && ($scope.nuevaCuenta.parent != null)) {
          $scope.nuevaCuenta.parent_id = $scope.nuevaCuenta.parent._id;
          socket.emit('cuentaAdd', $scope.nuevaCuenta);
          $scope.cuentas.push($scope.nuevaCuenta);
          $('#crearCuenta').modal('hide');
          return $scope.nuevaCuenta = {};
        }
      };
      return socket.on('cuentaAdded', function(cuenta) {
        return $scope.cuentas.push(cuenta);
      });
    }
  ]);

}).call(this);
