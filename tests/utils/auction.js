"use strict";

function Auction(type) {
  this.type = type;
  this.car = {};
}

Auction.prototype.isValid = function() {
  return this.type && this.start && this.end && this.car.model && this.car.brand && this.car.firstRegistration;
};

module.exports = Auction;