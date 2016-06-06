"use strict";

var util = require("util");

if (!global.fetch){
  var Promise = require("bluebird");
  require('isomorphic-fetch');
}

var domain = "http://127.0.0.1:9000";

function getCookie(headers){
  let cookieVars = headers._headers["set-cookie"].join(";").split(";");
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

function AuthorizationInfo(headers){

  this.cookies = getCookie(headers);

  this.getHeaders = ()=>{
    var headers = {
      "Cookie": Object.keys(this.cookies).reduce((string, key) => {
        return string + key + "=" + this.cookies[key] + ";";
      }, ""),
      "x-xsrf-token": this.cookies["XSRF-TOKEN"]
    };
    if (this.loginToken)
      headers["Authorization"] = "Bearer " + this.loginToken;

    headers["accept"] = "application/json, text/plain, */*";
    headers['content-type'] = 'application/json;charset=UTF-8';

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
    var auth = new AuthorizationInfo(response.headers);
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
      return res.json();
    }).then((json) => {
      auth.setLoginToken(json["token"]);
      return Promise.resolve(auth);
    });
  });
}

getAuthorizationInfo(domain, "jane@jane.com", "jane").then((auth) => {
  console.log(auth);
}).catch((err) => {
  console.error("Could not get authorization")
})
