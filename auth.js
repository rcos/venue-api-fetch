"use strict";

var reactEnv = true;
if (!global.fetch){
  reactEnv = false;
  var Promise = require("bluebird");
  require('isomorphic-fetch');
}else{
  process.nextTick = setImmediate
  var Promise = require("promise");
}

function getCookie(headers){
  var cookieVars;
  if (reactEnv){
    cookieVars = headers.get("set-cookie").split(",").join(";").split(";");
  }else{
    cookieVars = headers._headers["set-cookie"].join(";").split(";");
  }
  return cookieVars.reduce((o,v,i) => {
    var ar = v.split("=");
    if (ar.length != 2){
      return o;
    }
    var name = decodeURIComponent(ar[0].trim()); var val = decodeURIComponent(ar[1].trim());
    o[name] = val;
    return o;
  }, {});
}

function AuthorizationInfo(domain, headers){

  this.cookies = getCookie(headers);
  this.domain = domain;

  this.getHeaders = (opts)=>{
    opts = opts || {};
    var headers = {
      "Cookie": Object.keys(this.cookies).reduce((string, key) => {
        return string + key + "=" + this.cookies[key] + ";";
      }, ""),
      "x-xsrf-token": this.cookies["XSRF-TOKEN"]
    };
    if (this.loginToken)
      headers["Authorization"] = "Bearer " + this.loginToken;

    headers["accept"] = "application/json, text/plain, */*";
    if (!opts.form){
      headers['content-type'] = 'application/json;charset=UTF-8';
    }

    return headers;
  }

  this.setLoginToken = (token) => {
    this.loginToken = token;
    this.cookies["token"] = token;
  }
}

function _getPreAuthSession(domain){
  return fetch(domain + '/api/courses')
  .then(function(response) {
    if (response.status >= 400) {
      throw new Error("Bad response from server");
    }
    var auth = new AuthorizationInfo(domain, response.headers);
    return Promise.resolve(auth);
  });
}

function getAuthorizationInfo(domain, email, password){
  return _getPreAuthSession(domain).then((auth) => {
    return fetch(domain + "/auth/local", {
      method: "POST",
      headers: auth.getHeaders(),
      body: JSON.stringify({
        "email": email,
        "password": password
      })
    }).then((res) => {
      if (!res.ok){
        return res.text().then((err) => {
          throw new Error(err);
        });
      }else{
        return res.json();
      }
    }).then((json) => {
      auth.setLoginToken(json["token"]);
      return Promise.resolve(auth);
    });
  });
}

module.exports.getCookie =  getCookie;
module.exports.AuthorizationInfo =  AuthorizationInfo;
module.exports._getPreAuthSession =  _getPreAuthSession;
module.exports.getAuthorizationInfo =  getAuthorizationInfo;
