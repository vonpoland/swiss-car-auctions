'use strict';

var auctions = require('../controllers/auctions');

// The Package is past automatically as first parameter
module.exports = function (Auctions, app, auth) {
  app.post('/auctions/check', auth.requiresToken, auctions.checkIds);
  app.get('/auctions', auctions.find);

  app.route('/auctions/:auctionId')
    .put(auth.requiresToken, auctions.update);

  app.param('auctionId', auctions.auction);
};
