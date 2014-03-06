(function() {
  angular.module("App").controller('RegistrosController', [
    '$scope', '$http', '$timeout', 'socket', 'Registro', function($scope, $http, $timeout, socket, Registro) {
      var calcularTotales;
      $scope.registros = Registro.query();
      $scope.cuentaSelected = {};
      $scope.add = function() {
        if (($scope.registro != null) && ($scope.registro.beneficiary != null) && ($scope.registro.credito_id != null) && ($scope.registro.debito_id != null) && ($scope.registro.amount != null)) {
          socket.emit('registroAdd', $scope.registro);
          $scope.registros.push($scope.registro);
          return $scope.registro = {};
        }
      };
      $scope.$on('cuentaSelected', function(event, cuenta) {
        console.log('Cuenta: ', cuenta);
        $scope.cuentaSelected = cuenta;
        return socket.emit('registrosFindByCuenta', cuenta);
      });
      socket.on('registroAdded', function(registro) {
        return $scope.registros.push(registro);
      });
      socket.on('registrosFindByCuenta', function(registros) {
        console.log('Registros: ', registros);
        $scope.registros = registros;
        return calcularTotales();
      });
      return calcularTotales = function() {
        return angular.forEach($scope.registros, function(registro, index) {
          if (index !== 0) {
            if ($scope.cuentaSelected._id === registro.credito_id) {
              return registro.total = $scope.registros[index - 1].total + registro.amount;
            } else {
              return registro.total = $scope.registros[index - 1].total - registro.amount;
            }
          } else {
            if ($scope.cuentaSelected._id === registro.credito_id) {
              return registro.total = registro.amount;
            } else {
              return registro.total = -registro.amount;
            }
          }
        });
      };
    }
  ]);

}).call(this);
