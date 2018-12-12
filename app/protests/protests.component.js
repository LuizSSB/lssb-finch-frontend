'use strict';

angular
  .module('finch.protests', ['ngRoute', 'finch.auth'])
  .component('protests', {
    templateUrl: 'protests/protests.template.html',
    controller: ['$location', 'Auth', function ProtestsController ($location, Auth) {
        var self = this;
    }]
  });
