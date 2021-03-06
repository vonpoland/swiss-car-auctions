"use strict";

var axaPage = require("../../pages/axa-winterthur");
var Auction = require("../../utils/auction");
var appProxy = require("../../utils/appProxy");
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

function toLink(id) {
  return config.pages.axa.auctionAddress.replace(":auctionId", id);
}

describe("Should go to auctions", function () {
  beforeEach(function () {
    browser.ignoreSynchronization = true;
  });

  describe("fetch new auctions", function () {
    var auction;
    var invalidAuction;

    function setValue(name, obj, fn) {
      axaPage[name].getText().then(function (value) {
        obj[name] = fn ? fn(value) : value;
      });
    }

    beforeEach(function () {
      invalidAuction = false;
      auction = new Auction('axa');
    });

    it("Should iterate through new auctions and download it", function () {
      expect(process.argv.length).toBe(4);
      var auctionToFetch = toLink(process.argv[3].replace("--", ""));
      console.info("DOWWWWWWWWWWWWWWWWWW", auctionToFetch);
      axaPage.goToAuction(auctionToFetch);

      auction.url = auctionToFetch;
      auction.id = toId(auctionToFetch);

      setValue("start", auction, toDate);
      setValue("end", auction, toDate);
      setValue("model", auction.car);
      setValue("brand", auction.car);
      setValue("firstRegistration", auction.car, toDate);

      browser
        .wait(function () {
          return auction.isValid() || invalidAuction;
        })
        .then(function () {
          if (invalidAuction) {
            return;
          }
          console.info("AAAAAAAAAAA", auction);
          appProxy.sendAuction(auction, function (err, result) {
            expect(typeof(result.error)).toBe("undefined");
            auction = null;
          });
        });
    });

    afterEach(function () {
      browser.wait(function () {
        return invalidAuction || auction === null;
      })
    })
  })
});