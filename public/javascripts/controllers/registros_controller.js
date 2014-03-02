(function() {
  angular.module("App").controller('RegistrosController', [
    '$scope', '$http', '$timeout', 'socket', 'Registro', function($scope, $http, $timeout, socket, Registro) {
      $scope.registros = Registro.query();
      $scope.add = function() {
        if (($scope.registro != null) && ($scope.registro.beneficiary != null) && ($scope.registro.credito_id != null) && ($scope.registro.debito_id != null) && ($scope.registro.amount != null)) {
          socket.emit('registroAdd', $scope.registro);
          $scope.registros.push($scope.registro);
          return $scope.registro = {};
        }
      };
      return socket.on('registroAdded', function(registro) {
        return $scope.registros.push(registro);
      });
    }
  ]);

}).call(this);
