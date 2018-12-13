'use strict'

angular
  .module('finch.login', ['ngRoute', 'finch.config', 'finch.alert', 'finch.auth'])
  .component('login', {
    templateUrl: 'login/login.template.html',
    controller: ['$scope', '$location', 'Config', 'AlertUtil', 'Auth',
      function LoginController ($scope, $location, Config, AlertUtil, Auth) {
        function _goMainPage () {
          $location.path('protests')
        }

        $scope.toggleRegistration = () => {
          $scope.registering = !$scope.registering
          $scope.panelHeader = $scope.registering ? 'Cadastro' : 'Login'
          $scope.registrationToggleTitle = $scope.registering ? 'Cancelar' : 'Registrar-se'
        }
        $scope.logIn = () => {
          Config.setBaseURL($scope.serverAddress)
          return Auth.logIn($scope.username, $scope.password, $scope.rememberMe)
            .then(() => _goMainPage())
            .catch(AlertUtil.wsException)
        }
        $scope.register = () => {
          Config.setBaseURL($scope.serverAddress)
          return Auth.register($scope.username, $scope.password, $scope.email)
            .then($scope.logIn)
            .catch(AlertUtil.wsException)
        }

        $scope.serverAddress = Config.getBaseURL()
        $scope.rememberMe = false
        $scope.registering = true
        $scope.toggleRegistration()
      }
    ]
  })
