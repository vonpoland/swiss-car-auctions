'use strict';

/**
 * Check if any of the ids is new.
 */
var httpStatus = require('http-status');
var mongoose = require('mongoose');
var Auction = mongoose.model('Auction');
var _ = require('lodash');

exports.update = function (req, res) {
  var auction = req.auction;

  auction = _.extend(auction, req.body);

  if (!auction) {
    auction = new Auction(req.body);
  }

  auction.save(function (err) {
    if (err) {
      res.json(httpStatus.INTERNAL_SERVER_ERROR, {
        error: 'Cannot save the auction'
      });
      return;
    }

    res.status(httpStatus.CREATED).json(auction);
  });
};

/**
 * Find auction by id
 */
exports.auction = function (req, res, next, id) {
  Auction.load(id, function (err, auction) {
    if (err) return next(err);
    req.auction = auction;
    next();
  });
};

/**
 * find auctions
 */
exports.find = function (req, res) {
  Auction.find().exec(function(err, results) {
    res.json(results);
  });
};

/**
 * Check ids.
 */
exports.checkIds = function (req, res) {
  var ids = req.body.ids;
  var type = req.body.type;

  if (!Array.isArray(ids)) {
    res.status(httpStatus.BAD_REQUEST).send('Bad parameters');

    return;
  }

  if (typeof(type) === 'undefined' || !type) {
    res.status(httpStatus.BAD_REQUEST).send('Bad parameters');

    return;
  }

  Auction.findMany(req.body, function (err, result) {
    result = _.pluck(result, 'id');

    ids = ids.reduce(function (reduced, id) {
      if (!_.contains(result, id)) {
        reduced.push(id);
      }

      return reduced;
    }, []);

    res.json(ids);
  });
};