'use strict';

angular
  .module('finch.protests')
  .component('protestEdit', {
    templateUrl: 'protests/protest-edit.template.html',
    controller: ['$scope', '$routeParams', '$location', 'ProtestDataCtrl', 'AlertUtil',
      function ProtestEditController ($scope, $routeParams, $location, ProtestDataCtrl, AlertUtil) {
        function _timestampToDate (timestamp) {
          return timestamp ? new Date(timestamp * 1000) : '';
        }

        function getProtest () {
          ProtestDataCtrl.getById($routeParams.protestId)
            .then(protest => {
              $scope.createdDate = _timestampToDate(protest.createdTimestamp);
              $scope.updatedDate = _timestampToDate(protest.updatedTimestamp);
              $scope.emissionDate = _timestampToDate(protest.payment.emissionTimestamp);
              $scope.expirationDate = _timestampToDate(protest.payment.expirationTimestamp);
              $scope.protest = protest;
              $scope.enabled = true;
            })
            .catch(ex => AlertUtil.wsExceptionTryAgain(
              ex, (confirmed) => confirmed ? getProtest() : $location.path('protests')
            ));
        }

        function editProtest () {
          $scope.protest.payment.emissionTimestamp = $scope.emissionDate.getTime() / 1000;
          $scope.protest.payment.expirationTimestamp = $scope.expirationDate.getTime() / 1000;
          $scope.protest.payment.titleNumber = $scope.protest.paymentTitleNumber;
          $scope.protest.payment.debtor.document = $scope.protest.payment.debtorDocument;

          ProtestDataCtrl.update($scope.protest)
            .then(() => {
              AlertUtil.success('Protesto alterado!', () => $location.path('protests'));
            })
            .catch(ex => AlertUtil.wsException);
        }

        $scope.protestId = $routeParams.protestId;
        $scope.editProtest = editProtest;
        $scope.cancel = () => $location.path('protests');

        getProtest();
      }
    ]
  });