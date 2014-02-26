(function() {
  angular.module('models', ['ngResource']).factory('Cuenta', [
    '$resource', function($resource) {
      return $resource('/cuentas', {
        callback: 'JSON_CALLBACK'
      }, {
        buscar: {
          method: 'GET'
        },
        queryAll: {
          cache: true,
          method: 'GET',
          url: '/admin/cuentas/index.json'
        },
        create: {
          method: 'POST',
          url: '/cuentas'
        },
        update: {
          method: 'PUT',
          url: '/cuentas/:id.json'
        }
      });
    }
  ]).factory('Registro', [
    '$resource', function($resource) {
      return $resource('/registros', {
        callback: 'JSON_CALLBACK'
      }, {
        buscar: {
          method: 'GET'
        },
        queryAll: {
          cache: true,
          method: 'GET',
          url: '/admin/registros/index.json'
        },
        create: {
          method: 'POST',
          url: '/registros'
        },
        update: {
          method: 'PUT',
          url: '/registros/:id.json'
        }
      });
    }
  ]);

}).call(this);
