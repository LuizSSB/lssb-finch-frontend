'use strict';

angular
  .module('finch.protests')
  .component('protestEdit', {
    templateUrl: 'protests/protest-edit.template.html',
    controller: ['$scope', '$routeParams', '$location', 'ProtestDataCtrl', 'AlertUtil',
      function ProtestEditController ($scope, $routeParams, $location, ProtestDataCtrl, AlertUtil) {
        function getProtest () {
          ProtestDataCtrl.getById($routeParams.protestId)
            .then(protest => {
              $scope.protest = protest;
              $scope.enabled = true;
            })
            .catch(ex => AlertUtil.wsExceptionTryAgain(ex, getProtest))
        }

        function editProtest () {
          $scope.protest.payment.titleNumber = $scope.protest.paymentTitleNumber;
          $scope.protest.payment.debtor.document = $scope.protest.payment.debtorDocument;

          ProtestDataCtrl.update($scope.protest)
            .then(ignored => {
              AlertUtil.success('Protesto alterado!', () => $location.path('protests'));
            })
            .catch(ex => AlertUtil.wsException);
        }

        $scope.protestId = $routeParams.protestId;
        $scope.enabled = false;
        $scope.editProtest = editProtest;
        $scope.cancel = () => $location.path('protests');

        getProtest();
      }
    ]
  });
