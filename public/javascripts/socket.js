(function() {
  angular.module("App").factory('socket', [
    '$rootScope', function($rootScope) {
      var socket;
      socket = io.connect('http://localhost:3001/');
      return {
        on: function(eventName, callback) {
          return socket.on(eventName, function() {
            var args;
            args = arguments;
            return $rootScope.$apply(function() {
              return callback.apply(socket, args);
            });
          });
        },
        emit: function(eventName, data, callback) {
          return socket.emit(eventName, data, function() {
            var args;
            args = arguments;
            return $rootScope.$apply(function() {
              if (callback) {
                return callback.apply(socket, args);
              }
            });
          });
        }
      };
    }
  ]);

}).call(this);
