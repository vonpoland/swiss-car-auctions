'use strict';

angular.module('mean.auctions').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('auctions example page', {
      url: '/auctions/example',
      templateUrl: 'auctions/views/index.html'
    });
  }
]);
