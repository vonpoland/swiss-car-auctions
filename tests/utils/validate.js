"use strict";

var config = require("config");
var http = require("http");

exports.validateIds = function(params, callback) {
  var paramsString = JSON.stringify(params);
  var options = {
    method : "POST",
    port: config.validate.port,
    host: config.validate.address,
    path: config.validate.path,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Length": paramsString.length
    }
  };

 function handleResponse(response) {
    var str = '';
    response.setEncoding('utf8');
    response.on('data', function (chunk) {
      str += chunk;
    });

    response.on('end', function () {
      callback(str);
    });
  }

  var req = http.request(options, handleResponse);

  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });
  console.info(paramsString);
  req.write(paramsString);
  req.end();
};