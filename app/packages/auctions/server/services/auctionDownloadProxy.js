'use strict';

var async = require("async");
var exec = require('child_process').exec;

exports.download = function (ids) {
  async.eachSeries(ids, function (id) {
    exec('protractor config/axa.headless.conf.js --' + id,
      {
        cwd: "../tests"
      },
      function (error, stdout, stderr) {
        if (error !== null || error !== null) {
          console.log('exec error: ' + error);
          console.log('stderr error: ' + stderr);
          return;
        }

        console.log('AUCTION Downloaded done' + stdout);
      });
  })
};