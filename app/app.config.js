'use strict'

angular
  .module('finch', [
    'ngRoute',
    'LocalStorageModule',
    'ui.utils.masks',
    'oitozero.ngSweetAlert',

    'finch.login',
    'finch.protests',

    'finch.auth',
    'finch.serviceClient',
    'finch.alert',

    'finch.dataControl'
  ])
  .config(['$routeProvider', 'localStorageServiceProvider',
    function config ($routeProvider, localStorageServiceProvider, Auth) {
      localStorageServiceProvider.setPrefix('finch')

      const authenticatedResolution = {
        mess: function ($location, Auth) {
          if (!Auth.isLoggedIn()) {
            $location.path('login')
          }
        }
      }

      $routeProvider
        .when('/login', {
          template: '<login></login>',
          resolve: {
            mess: function ($location, Auth) {
              if (Auth.isLoggedIn()) {
                $location.path('protests')
              }
            }
          }
        })
        .when('/protests', {
          template: '<protests></protests>',
          resolve: authenticatedResolution
        })
        .when('/protests/file', {
          template: '<protests-upload></protests-upload>',
          resolve: authenticatedResolution
        })
        .when('/protests/:protestId', {
          template: '<protest-edit></protest-edit>',
          resolve: authenticatedResolution
        })
        .otherwise('/login')
    }
  ])
