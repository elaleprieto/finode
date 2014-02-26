(function() {
  angular.module("App").controller('RegistrosController', [
    '$scope', '$http', '$timeout', 'socket', 'Registro', function($scope, $http, $timeout, socket, Registro) {
      console.log('ola');
      $scope.add = function() {
        return console.log($scope.registro);
      };
      return socket.on('registroAdded', function(registro) {
        return console.log(registro);
      });
    }
  ]);

}).call(this);
