'use strict';

angular
  .module('finch.protests')
  .component('protestsUpload', {
    templateUrl: 'protests/protests-upload.template.html',
    controller: ['$scope', '$location', 'ProtestDataCtrl', 'AlertUtil',
      function ProtestUploadController ($scope, $location, ProtestDataCtrl, AlertUtil) {
      	$scope.cancel = () => {
      		$location.path('protests');
      	};

        $scope.submit = () => {
          ProtestDataCtrl.upload($scope.file)
            .then(() => AlertUtil.success(
              'Protestos inseridos.', () => $location.path('protests')
            ))
            .catch(AlertUtil.wsException);
        };
      }
    ]
  })
  .directive("ngFileSelect", function(){
    return {
      link: function($scope, el){
        el.bind("change", function (e){
          $scope.file = (e.srcElement || e.target).files[0];
        })
      }
    }
  });
