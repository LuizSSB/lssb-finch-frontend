'use strict'

angular
  .module('finch.protests', ['ngRoute', 'finch.dataControl', 'finch.alert', 'finch.auth'])
  .component('protests', {
    templateUrl: 'protests/protests.template.html',
    controller: ['$scope', '$location', 'ProtestDataCtrl', 'AlertUtil', 'Auth',
      function ProtestsController ($scope, $location, ProtestDataCtrl, AlertUtil, Auth) {
        function search () {
          if ($scope.maxValue < 0.01) {
            $scope.maxValue = undefined
          }
          if ($scope.minValue < 0.01) {
            $scope.minValue = undefined
          }

          const request = DTO.new.SearchProtestRequest($scope)
          ProtestDataCtrl.search(request)
            .then(protests => {
              $scope.protests = protests
            })
            .catch(ex => AlertUtil.wsExceptionTryAgain(
              ex, (confirmed) => confirmed && search()
            ))
        }

        $scope.search = search
        $scope.editProtest = protest => $location.path('protests/' + protest.internalId)
        $scope.upload = () => $location.path('protests/file')
        $scope.logOut = () => Auth.logOut().then(() => window.location.reload())
        $scope.username = Auth.getLoggedUser().username
        $scope.clean = () => {
          $scope.minValue = undefined
          $scope.maxValue = undefined
          $scope.bankId = undefined
          $scope.debtor = undefined

          search()
        }

        $scope.clean()
      }
    ]
  })
