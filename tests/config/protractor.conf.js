"use strict";

var config = {
    //seleniumAddress: "http://localhost:9515",
    specs: [
        '../specs/*.spec.js'
    ],
    allScriptsTimeout: 60000,
    capabilities: {
        'browserName': "chrome",
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