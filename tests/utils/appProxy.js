"use strict";

var config = require("config");
var http = require("http");

function handleResponse(response, callback) {
  var str = '';
  response.setEncoding('utf8');
  response.on('data', function (chunk) {
    str += chunk;
  });

  response.on('end', function () {
    callback(JSON.parse(str));
  });
}

function handleError(e) {
  console.info('problem with request: ' + e.message);
}

function sendRequest(data, options, callback) {
  var paramsString = JSON.stringify(data);
  options = {
    method: options.method,
    port: config.common.port,
    host: config.common.address,
    path: options.path,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Length": paramsString.length
    }
  };

  var req = http.request(options, function (response) {
    handleResponse(response, callback);
  });

  req.on('error', handleError);
  req.write(paramsString);
  req.end();
}

exports.sendAuction = function (data, callback) {
  var path = config.common.insert.replace(":auctionId", data.id);

  console.info("SEND AUCTION", path);
  sendRequest(data, {
    path: path,
    method: "PUT"
  }, callback);
};

exports.validateIds = function (data, callback) {
  sendRequest(data, {
    path: config.common.validate,
    method: "POST"
  }, callback);
};