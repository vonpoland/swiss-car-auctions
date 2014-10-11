"use strict";

var config = {
    specs: [
        '../specs/*.spec.js'
    ],
    allScriptsTimeout: 60000,
    //'phantomjs.binary.path': require('phantomjs').path,
    capabilities: {
        browserName: "chrome",
        version: '',
        platform: 'ANY'
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