"use strict";

var config = {
    specs: [
        '../specs/*.spec.js'
    ],
    allScriptsTimeout: 60000,
    capabilities: {
        browserName: "phantomjs",
        'phantomjs.binary.path': require('phantomjs').path
    },
    params: {
        pages: [
            {
                name: "axa",
                address: "http://axa.ricardo.ch/"
            }
        ]
    },
    onPrepare: function () {
        browser.manage().window().maximize();
        browser.navigate("/");
    }
};

exports.config = config;