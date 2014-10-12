"use strict";

var Page = require('astrolabe').Page;
var config = require("config");

module.exports = Page.create({
    url: {value: 'http://axa.ricardo.ch/'},
    // Methods
    goToAuction: { value: function (auctionId) {
      browser.get(auctionId);
    }},
    // Elements
    nextPage: {get: function() {
       return this.findElement(by.css(".n_ListTopRight .n_ListNext > a:first-of-type"))
    }},
    currentPage: {get: function() {
        return  this.findElement(by.css(".n_ListTopRight .n_ListPagination .n_CurrentPage"));
    }},
    pageCount: {get: function() {
        return  element.all(by.css(".n_ListTopRight .n_ListPagination > *")).last();
    }},
    auctionLinks: { get: function() {
        return element.all(by.css(".n_ListTable tbody tr .Listing_Description a"));
    }},
    brand: {
      get: function() {
        return this.findElement(by.css("#spanmake"));
      }
    },
    model: {
      get: function() {
        return this.findElement(by.css("#spanmodel"));
      }
    },
    start: {
      get: function() {
        return this.findElement(by.css("#labelStartdate"));
      }
    },
    end: {
      get: function() {
        return this.findElement(by.css("#labelEnddate"));
      }
    },
    firstRegistration: {
      get: function() {
        return this.findElement(by.css("#spanregistrationdate"));
      }
    },
    auctionInvalid: {
      get: function() {
        return this.findElement(by.css("#errormessage"));
      }
    }
});
