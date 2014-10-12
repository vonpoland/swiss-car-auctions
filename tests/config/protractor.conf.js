"use strict";

var config = {
  specs: [
    '../specs/**/*.spec.js'
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