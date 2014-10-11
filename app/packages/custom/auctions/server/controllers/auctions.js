/**
 * Check if any of the ids is new.
 */
var httpStatus = require("http-status");

exports.checkIds = function(req, res) {
  var ids = req.body;

  if(!Array.isArray(ids)) {
    res.send("Bad parameters", httpStatus.BAD_REQUEST);

    return;
  }

  res.send("OK");
};