"use strict";

if (!global.fetch){
  var Promise = require("bluebird");
  require('isomorphic-fetch');
}
