"use strict";

var config = {
  specs: [
    '../specs/axa-winterthur/fetchAuction.spec.js'
  ],
  allScriptsTimeout: 60000,
  capabilities: {
    browserName: "chrome",
    version: '',
    platform: 'ANY'
  },
  onPrepare: function () {
    browser.navigate("/");
  }
};

exports.config = config;