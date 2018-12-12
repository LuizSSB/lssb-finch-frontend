'use strict';

angular
  .module('finch.protests', ['ngRoute', 'finch.dataControl', 'finch.alert'])
  .component('protests', {
    templateUrl: 'protests/protests.template.html',
    controller: ['$scope', '$location', 'ProtestDataCtrl', 'AlertUtil',
      function ProtestsController ($scope, $location, ProtestDataCtrl, AlertUtil) {
        function search () {
          const request = DTO.new.SearchProtestRequest({

          });
          ProtestDataCtrl.search(request)
            .then(protests => {
              $scope.protests = protests;
            })
            .catch(ex => AlertUtil.wsExceptionTryAgain(ex, search))
        }

        $scope.editProtest = function (protest) {
          $location.path('protests/' + protest.internalId);
        };
        
        search();
      }
    ]
  });
