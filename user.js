"use strict";

var errorLog = require("./errorlog");

if (!global.fetch){
  var Promise = require("bluebird");
  require('isomorphic-fetch');
}

function getMe(auth){
  var apiPath = auth.domain + "/api/users/me";
  return fetch(apiPath, {
    method: "GET",
    headers: auth.getHeaders()
  }).then((res) => {
    return res.json();
  })
  .catch(errorLog(apiPath));
}

function getMyEvents(auth){
  var apiPath = auth.domain + "/api/users/me?withSectionEvents=true";
  return fetch(apiPath, {
    method: "GET",
    headers: auth.getHeaders()
  }).then((res) => {
    return res.json()
  }).then((resJson) => {
    return resJson["sectionevents"];
  }).catch(errorLog(apiPath));
}

module.exports.getMe = getMe;
module.exports.getMyEvents = getMyEvents;
