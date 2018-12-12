'use strict';

angular
  .module('finch.login', ['finch.auth'])
  .component('login', {
    templateUrl: 'login/login.template.html',
    controller: ['Auth', function LoginController (Auth) {
        var self = this;
        console.log('Hey', Auth);
    }]
  });
