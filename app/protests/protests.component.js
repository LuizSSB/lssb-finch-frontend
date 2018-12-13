'use strict';

angular
  .module('finch.protests', ['ngRoute', 'finch.dataControl', 'finch.alert', 'finch.auth'])
  .component('protests', {
    templateUrl: 'protests/protests.template.html',
    controller: ['$scope', '$location', 'ProtestDataCtrl', 'AlertUtil', 'Auth',
      function ProtestsController ($scope, $location, ProtestDataCtrl, AlertUtil, Auth) {
        function search () {
          const request = DTO.new.SearchProtestRequest({

          });
          ProtestDataCtrl.search(request)
            .then(protests => {
              $scope.protests = protests;
            })
            .catch(ex => AlertUtil.wsExceptionTryAgain(
              ex, (confirmed) => confirmed && search()
            ))
        }

        $scope.editProtest = () => location.path('protests/' + protest.internalId);
        $scope.upload = () => $location.path('protests/file');
        $scope.logOut = () => Auth.logOut().then(() => window.location.reload());
        
        search();
      }
    ]
  });
