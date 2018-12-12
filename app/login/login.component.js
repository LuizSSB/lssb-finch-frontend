'use strict';

angular
  .module('finch.login', ['ngRoute', 'finch.alert', 'finch.auth'])
  .component('login', {
    templateUrl: 'login/login.template.html',
    controller: ['$scope', '$location', 'AlertUtil', 'Auth',
      function LoginController ($scope, $location, AlertUtil, Auth) {
        function _goMainPage () {
          $location.path('protests');
        }

        if (Auth.isLoggedIn()) {
          _goMainPage();
        }

        $scope.toggleRegistration = () => {
          $scope.registering = !$scope.registering;
          $scope.panelHeader =  $scope.registering ? 'Cadastro' : 'Login';
          $scope.registrationToggleTitle = $scope.registering ? 'Cancelar' : 'Registrar-se';
        };
        $scope.logIn = () => {
          return Auth.logIn($scope.username, $scope.password, $scope.rememberMe)
            .then(ignored => _goMainPage())
            .catch(err => AlertUtil.alertWSException(err));
        };        
        $scope.register = () => {
          return Auth.register($scope.username, $scope.password, $scope.email)
            .then($scope.logIn)
            .catch(err => AlertUtil.alertWSException(err));
        };

        $scope.rememberMe = false;
        $scope.registering = true;
        $scope.toggleRegistration();
      }
    ]
  });
