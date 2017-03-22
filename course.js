"use strict";

var errorLog = require("./errorlog");

if (!global.fetch){
  var Promise = require("bluebird");
  require('isomorphic-fetch');
}

function getCourses(auth){
  var apiPath = auth.domain + "/api/courses/";
  return fetch(apiPath, {
    method: "GET",
    headers: auth.getHeaders()
  }).then((res) => {
    //console.log(res.json());
    //PARSE IT UP
    return res.json()
  }).catch(errorLog(apiPath));
}

function getCourse(auth, id){
  var apiPath = auth.domain + "/api/courses/" + id;
  return fetch(apiPath, {
    method: "GET",
    headers: auth.getHeaders()
  }).then((res) => {
    //console.log(res.json());
    //PARSE IT UP
    return res.json()
  }).catch(errorLog(apiPath));
}

module.exports.getCourses = getCourses;
module.exports.getCourse = getCourse;
