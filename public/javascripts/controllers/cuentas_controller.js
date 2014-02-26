(function() {
  angular.module("App").controller('CuentasController', [
    '$scope', '$http', '$timeout', 'socket', 'Cuenta', function($scope, $http, $timeout, socket, Cuenta) {
      $scope.cuentas = Cuenta.query();
      $scope.add = function() {
        return console.log($scope.cuenta);
      };
      return socket.on('cuentaAdded', function(cuenta) {
        return console.log(cuenta);
      });
    }
  ]);

}).call(this);
