"use strict";

if (!Promise){
  var Promise = require("bluebird");
}

var eventModule = require("./event");
var userModule = require("./user");
var authModule = require("./auth");

// TODO export modules
module.exports = function(domain){

  var auth;

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

  return {
    authenticate: authenticate,
    getMe: getMe,
    getMyEvents: getMyEvents,
    getEvent: getEvent
  }
};
