// Used for error logging in fetch requests
module.exports = function(apiPath){
  return function(err){
    console.error("ERROR", apiPath, err);
    throw new Error(err);
  };
};
