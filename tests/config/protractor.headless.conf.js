"use strict";

var config = {
  specs: [
    '../specs/**/*.spec.js'
  ],
  allScriptsTimeout: 60000,
  capabilities: {
    browserName: "phantomjs",
    'phantomjs.binary.path': require('phantomjs').path
  },
  onPrepare: function () {
    browser.navigate("/");
  }
};

exports.config = config;