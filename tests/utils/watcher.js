"use strict";

function Watcher(pageCountPromise, currentPagePromise) {
    var currentPage;
    var pageCount;

    pageCountPromise.then(function (value) {
        pageCount = value;
    });

    currentPagePromise.then(function (value) {
        currentPage = value;
    });

    this.resolved = function () {
        return typeof(currentPage) !== "undefined" && typeof(pageCount) !== "undefined";
    };

    this.allPagesProcessed = function() {
      return currentPage === pageCount;
    }
}


module.exports = Watcher;