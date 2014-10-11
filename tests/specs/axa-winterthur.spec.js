"use strict";

var axaPage = require("../pages/axa-winterthur");
var Watcher = require("../utils/watcher");

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
                        console.log(link);
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
        })
    })
});