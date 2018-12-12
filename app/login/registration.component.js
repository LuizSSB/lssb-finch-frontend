'use strict';

angular
  .module('finch.login')
  .component('registration', {
    templateUrl: 'login/registration.template.html',
    controller: ['$location', 'Auth', function RegistrationController ($location, Auth) {
        // if (Auth.isLoggedIn()) {
        // 	$location.path('protests');
        // }

        Auth.register('zig', 'zag', 'zig@zag.com')
        	.then(user => $location.path('protests'))
        	.catch(err => alert(JSON.stringify(err)));
    }]
  });
