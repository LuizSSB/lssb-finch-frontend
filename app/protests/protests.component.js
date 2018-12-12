'use strict';

angular
  .module('finch.protests', ['ngRoute'])
  .component('protests', {
    templateUrl: 'protests/protests.template.html',
    controller: [function ProtestsController () {
        var self = this;
    }]
  });
