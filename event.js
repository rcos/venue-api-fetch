"use strict";

var errorLog = require("./errorlog");

if (!global.fetch){
  var Promise = require("bluebird");
  require('isomorphic-fetch');
}

function getEvent(auth, eventId){
  var apiPath = auth.domain + "/api/sectionevents/" + eventId + "?withEventInfo=true";
  return fetch(apiPath, {
    method: "GET",
    headers: auth.getHeaders()
  }).then((res) => {
    console.log("got response");

    return res.json()

  }).catch(errorLog(apiPath));
}

function uploadToEvent(auth, info){
  var eventId = info["eventId"];
  var filePath = info["filePath"];
  var title = info["title"];
  var content = info["content"];
}


module.exports.getEvent = getEvent;
module.exports.uploadToEvent = uploadToEvent;
