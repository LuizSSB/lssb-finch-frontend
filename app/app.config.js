'use strict';

angular.
  module('finch').
  config(['$routeProvider',
    function config($routeProvider) {
      $routeProvider.
        when('/login', {
          template: '<login></login>'
        }).
        otherwise('/login');
    }
  ]);
