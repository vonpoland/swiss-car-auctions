'use strict';

angular.module('mean.auctions').factory('Auctions', ['$resource',
  function($resource) {
    return $resource('auctions/:auctionId', {
      articleId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
