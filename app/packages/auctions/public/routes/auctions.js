'use strict';

angular.module('mean.auctions').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('all auctions', {
      url: '/auctions',
      templateUrl: 'auctions/views/index.html'
    });
  }
]);
