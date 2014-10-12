"use strict";

var axaPage = require("../../pages/axa-winterthur");
var Watcher = require("../../utils/watcher");
var auctionLinks = [];
var Auction = require("../../utils/auction");
var appProxy = require("../../utils/appProxy");
var auctionsToFetch;
var config = require("config");

function toDate(value) {
  var date = new Date();
  var values = value.split(".");

  date.setMonth(values[0]);
  date.setYear(values[1]);
  return date.toISOString();
}

function toId(url) {
  url = url.split("/").filter(function (element) {
    return element !== "";
  });

  return url[url.length - 1];
}

function toLinks(id) {
  return config.pages.axa.auctionAddress.replace(":auctionId", id);
}

describe("Should go to auctions", function () {
  beforeEach(function () {
    browser.ignoreSynchronization = true;
  });

  describe("Get all auctions and put into storage", function () {
    it("Iterate through all auctions ", function () {
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
      appProxy.validateIds({
        ids: auctionLinks.map(toId),
        type: "axa"
      }, function (result) {
        auctionsToFetch = result.map(toLinks);
        console.info("AUCTONS TO FETCH:", auctionsToFetch);
      });

      browser.wait(function () {
        return typeof(auctionsToFetch) !== "undefined";
      })
    })
  });
});