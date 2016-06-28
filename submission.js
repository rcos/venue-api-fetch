"use strict";

var errorLog = require("./errorlog");

if (!global.fetch){
  var Promise = require("bluebird");
  require('isomorphic-fetch');
}

function getMySubmissions(auth){
  var apiPath = auth.domain + "/api/submissions?onlyStudent=me";
  return fetch(apiPath, {
    method: "GET",
    headers: auth.getHeaders()
  }).then((res) => {
    return res.json()
  }).catch(errorLog(apiPath));
}

module.exports.getMySubmissions = getMySubmissions;
