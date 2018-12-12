'use strict';

angular
  .module('finch.login', ['ngRoute', 'finch.auth'])
  .component('login', {
    templateUrl: 'login/login.template.html',
    controller: ['$scope', '$location', 'Auth',
      function LoginController ($scope, $location, Auth) {
        console.log($scope, $location);
          $scope.goToRegistration = function () {
            $location.path('register');
          }
      }
    ]
  });
