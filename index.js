"use strict";

if (!Promise){
  var Promise = require("bluebird");
}

var eventModule = require("./event");
var userModule = require("./user");
var authModule = require("./auth");

// TODO export modules
module.exports = (function(){

  var domain = "http://192.168.0.23:9000";

  var auth;

  function setDomain(dm){
    domain = dm;
  }

  function authenticate(username, password){
    return authModule.getAuthorizationInfo(domain, username, password).then((authInfo) => {
      auth = authInfo;
    });
  }

  function getMe(){
    return userModule.getMe(auth);
  }

  function getMyEvents(){
    return userModule.getMyEvents(auth);
  }

  function getEvent(id){
    return eventModule.getEvent(auth, id);
  }

  function uploadToEvent(info){
    eventModule.uploadToEvent(auth, info)
  }

  return {
    setDomain: setDomain,
    authenticate: authenticate,
    getMe: getMe,
    getMyEvents: getMyEvents,
    getEvent: getEvent,
    uploadToEvent: uploadToEvent,
    _getAuth: () => auth
  }
})();
