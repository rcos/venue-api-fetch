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

function getMyEvents(auth){
    var apiPath = auth.domain + "/api/sectionevents?onlyUserSections=me&withEventInfo=true&withSection=true";
    return fetch(apiPath, {
        method: 'GET',
        headers: auth.getHeaders()
    }).then((res) => {
        return res.json();
    }).then((json) => {
        return Object.keys(json).map((k) => json[k]);
    })
      .catch(errorLog(apiPath));
}

// TODO file upload support in react is shaky atm
function uploadToEvent(auth, info){

  var apiPath = auth.domain + "/api/submissions/";
  var eventId = info["eventId"];
  var filePath = info["filePath"];
  var title = info["title"];
  var content = info["content"];
  var headers = auth.getHeaders();
  delete headers["content-type"];

  // TODO add alternate method for desktop testing, FormData is only
  // available in react-native
  var form = new FormData();
  form.append('title', title);
  form.append('content', content);
  form.append('eventId', eventId);
  if (info["coordinates"]){
    form.append('coordinates[0]', info["coordinates"][0].toString());
    form.append('coordinates[1]', info["coordinates"][1].toString());
  }
  form.append('files[]', {
    uri: filePath,
    type: 'image/jpeg',
    name: 'file.jpeg'
  });

  return fetch(apiPath, {
    method: "POST",
    headers: headers,
    body: form
  })
}

module.exports.getEvent = getEvent;
module.exports.getMyEvents = getMyEvents;
module.exports.uploadToEvent = uploadToEvent;
