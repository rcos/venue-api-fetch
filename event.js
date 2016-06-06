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
    return res.json()
  }).catch(errorLog(apiPath));
}

// TODO file upload support in react is shaky atm
function uploadToEvent(auth, info){
  var eventId = info["eventId"];
  var filePath = info["filePath"];
  var title = info["title"];
  var content = info["content"];
  var form = FormData();
  form.append('title', title);
  form.append('content', content);
  form.append('eventId', eventId);
  form.append('files', {
    uri: filePath,
    type: 'image/jpeg',
    name: 'photo.jpg',
  });
  return fetch(apiPath, {
    method: "POST",
    headers: auth.getHeaders(),
    body: form
  })
}


module.exports.getEvent = getEvent;
module.exports.uploadToEvent = uploadToEvent;
