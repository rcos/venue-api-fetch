"use strict";

if (!Promise){
  var Promise = require("bluebird");
}

var eventModule = require("./event");
var userModule = require("./user");
var authModule = require("./auth");
var submissionModule = require("./submission");

// TODO export modules
module.exports = (function(){

  var domain = "http://192.168.0.23:3000";

  var auth;

  function setDomain(dm){
    domain = dm;
  }

  function authenticate(username, password){
    return authModule.getAuthorizationInfo(domain, username, password).then((authInfo) => {
      auth = authInfo;
    });
  }

  function authenticateWithToken(token){
    return authModule.getAuthorizationInfoFromToken(domain, token).then((authInfo) => {
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
    return eventModule.uploadToEvent(auth, info)
  }

  function getSignupURL(){
    return `${domain}/student/signup`;
  }

  function getMySubmissions(){
    return submissionModule.getMySubmissions(auth);
  }

  function getDomain(){
    return domain;
  }

  return {
    setDomain: setDomain,
    authenticate: authenticate,
    authenticateWithToken: authenticateWithToken,
    getMe: getMe,
    getMyEvents: getMyEvents,
    getMySubmissions: getMySubmissions,
    getEvent: getEvent,
    uploadToEvent: uploadToEvent,
    getSignupURL: getSignupURL,
    getDomain: getDomain,
    _getAuth: () => auth
  }
})();
