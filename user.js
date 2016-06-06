"use strict";

if (!global.fetch){
  var Promise = require("bluebird");
  require('isomorphic-fetch');
}

function getMe(){

}

function getMyEvents(){

}

module.exports.getMe = getMe;
module.exports.getMyEvents = getMyEvents;
