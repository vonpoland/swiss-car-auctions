"use strict";

var axaPage = require("../pages/axa-winterthur");
var Watcher = require("../utils/watcher");
var auctionLinks = [];
var validate = require("../utils/validate");
var auctionsToFetch;

describe("Should go to auctions", function () {
  beforeEach(function () {
    browser.ignoreSynchronization = true;
  });

  describe("Get all auctions and put into storage", function () {
    it("Iterate through all auctions ", function () {
      return;
      axaPage.go();

      var finish = false;

      function getAllAuctionLinks() {
        var watcher = new Watcher(axaPage.pageCount.getText(), axaPage.currentPage.getText());
        axaPage.auctionLinks.each(function (element) {
          element.getAttribute("href").then(function (link) {
            auctionLinks.push(link);
          })
        });

        browser
          .wait(function () {
            if (!watcher.resolved()) {
              return false;
            }

            if (watcher.allPagesProcessed()) {
              finish = true;
            }

            return true;
          })
          .then(function () {
            if (finish) {
              return;
            }

            axaPage.nextPage.click();
            getAllAuctionLinks();
          });
      }

      expect(axaPage.pageCount.getText()).toBeGreaterThan(0);
      getAllAuctionLinks();
    });

    afterEach(function () {
      auctionLinks = ["a", "b"];

      validate.validateIds({
        ids: auctionLinks,
        type: "axa"
      }, function (result) {
        auctionsToFetch = result;
        console.info(auctionsToFetch);
      });

      browser.wait(function () {
        return typeof(auctionsToFetch) !== "undefined";
      })
    })
  });

  describe("fetch new auctions", function() {
    it("Should iterate through new auctions and download it", function() {
      var auctionId = auctionsToFetch.pop();
      axaPage.goToAuction(auctionId);
    })
  })
});