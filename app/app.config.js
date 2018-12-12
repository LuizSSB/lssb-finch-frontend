'use strict';

angular
  .module('finch', [
    'ngRoute',
    'LocalStorageModule',

    'oitozero.ngSweetAlert',

    'finch.login',
    'finch.protests',

    'finch.auth',
    'finch.serviceClient',
    'finch.alert'
  ])
  .config(['$routeProvider', 'localStorageServiceProvider',
    function config($routeProvider, localStorageServiceProvider) {
      localStorageServiceProvider.setPrefix('finch');

      $routeProvider
        .when('/login', { template: '<login></login>' })
        .when('/protests', { template: '<protests></protests>' })
        .otherwise('/login');
    }
  ]);
