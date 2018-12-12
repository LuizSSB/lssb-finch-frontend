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
    function config($routeProvider, localStorageServiceProvider, Auth) {
      localStorageServiceProvider.setPrefix('finch');

      const authenticatedResolution =  {
        mess: function ($location, Auth) {
          if (!Auth.isLoggedIn()) {
            $location.path('login');
          }
        }
      };

      $routeProvider
        .when('/login', { 
          template: '<login></login>',
          resolve: {
            mess: function ($location, Auth) {
              if (Auth.isLoggedIn()) {
                $location.path('protests');
              }
            }
          }
        })
        .when('/protests', {
          template: '<protests></protests>',
          resolve: authenticatedResolution
        })
        .otherwise('/login');
    }
  ]);
