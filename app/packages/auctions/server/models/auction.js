'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Auction Schema
 */
var AuctionSchema = new Schema({
  id: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    trim: true
  },
  start: {
    type: Date,
    required: true
  },
  end: {
    type: Date,
    required: true
  },
  url: {
    type: String,
    required: true,
    trim: true
  },
  car: {
    brand: {
      type: String,
      required: true,
      trim: true
    },
    model: {
      type: String,
      required: true,
      trim: true
    },
    firstRegistration: {
      type: Date,
      required: true,
      trim: true
    },
    version: {
      type: String,
      trim: true
    },
    mileage: {
      type: String,
      trim: true
    },
    body: {
      type: String
    },
    fuel: {
      type: String,
      trim: true
    },
    transmission: {
      type: String,
      trim: true
    },
    color: {
      type: String,
      trim: true
    },
    power: {
      type: String,
      trim: true
    },
    engineCapacity: {
      type: String,
      trim: true
    },
    doors: {
      type: String,
      trim: true
    }
  }
});

/**
 * Validations
 */
AuctionSchema.path('start').validate(function (start) {
  return !!start;
}, 'Start cannot be blank');

AuctionSchema.path('end').validate(function (end) {
  return !!end;
}, 'End cannot be blank');

AuctionSchema.path('url').validate(function (url) {
  return !!url;
}, 'url cannot be blank');

AuctionSchema.path('car.brand').validate(function(brand) {
  return !!brand;
}, 'car brand cannot be blank');

AuctionSchema.path('car.model').validate(function(model) {
  return !!model;
}, 'car model cannot be blank');

/**
 * Statics
 */
AuctionSchema.statics.load = function (id, cb) {
  this.findOne({
    id: id
  }).exec(cb);
};

AuctionSchema.statics.findMany = function (params, cb) {
  this.find({
    id: { $in: params.ids },
    type: params.type
  }, cb);
};

mongoose.model('Auction', AuctionSchema);
