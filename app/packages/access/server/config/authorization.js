'use strict';

/**
 * Generic require login routing middleware
 */
exports.requiresLogin = function (req, res, next) {
  if (!req.isAuthenticated()) {
    return res.send(401, 'User is not authorized');
  }
  next();
};

/**
 * Generic require Admin routing middleware
 * Basic Role checking - future release with full permission system
 */
exports.requiresAdmin = function (req, res, next) {
  if (!req.isAuthenticated() || !req.user.hasRole('admin')) {
    return res.send(401, 'User is not authorized');
  }
  next();
};

/**
 * Generic require Admin routing middleware
 * Basic Role checking - future release with full permission system
 */
exports.requiresToken = function (req, res, next) {
  if (req.query.token === '12345') {
    next();
    return;
  }

  return res.send(401, 'User is not authorized');

};

