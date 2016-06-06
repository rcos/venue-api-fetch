"use strict";

if (!global.fetch){
  var Promise = require("bluebird");
  require('isomorphic-fetch');
}

function getEvent(auth, eventId){

}

function uploadToEvent(auth, info){
  var eventId = info["eventId"];
  var filePath = info["filePath"];
  var title = info["title"];
  var content = info["content"];
}


module.exports.getEvent = getEvent;
module.exports.uploadToEvent = uploadToEvent;
