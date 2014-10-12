'use strict';

angular.module('mean.auctions').controller('AuctionsController', ['$scope', 'Global', 'Auctions',
  function($scope, Global, Auctions) {
    $scope.global = Global;
    $scope.package = {
      name: 'auctions'
    };

    $scope.auctions = Auctions.query();
  }
]);
