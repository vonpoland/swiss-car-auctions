"use strict";

var Page = require('astrolabe').Page;

module.exports = Page.create({
    url: {value: 'http://axa.ricardo.ch/'},
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
    }}
});