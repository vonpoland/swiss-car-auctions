'use strict';

var articles = require('../controllers/auctions');

// The Package is past automatically as first parameter
module.exports = function (Auctions, app, auth, database) {

  app.get('/auctions/example/anyone', function (req, res, next) {
    res.send('Anyone can access this');
  });

  app.get('/auctions/example/auth', auth.requiresLogin, function (req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.post('/auctions/check', auth.requiresToken, articles.checkIds);

  app.get('/auctions/example/admin', auth.requiresAdmin, function (req, res, next) {
    res.send('Only users with Admin role can access this');
  });

  app.get('/auctions/example/render', function (req, res, next) {
    Auctions.render('index', {
      package: 'auctions'
    }, function (err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });
};
