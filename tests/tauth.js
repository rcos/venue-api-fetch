var chai = require("chai");
var expect = chai.expect;
var auth = require("../auth.js");

var domain = "http://127.0.0.1:3001";

describe("Authentication", () => {

  var testUser = {
      name: "jane@jane.com",
      password: "jane"
  };

  var token;
  it("Should properly authorize user", (done) => {
    auth.getAuthorizationInfo(domain, testUser.name, testUser.password).then((authInfo)=>{
      expect(authInfo).to.not.be.null;
      expect(authInfo.token).to.not.be.null;
      token = authInfo.token;
      done();
    }).catch(done);
  });

  it("should authorize user using only token", (done) => {
    auth.getAuthorizationInfoFromToken(domain, token).then((authInfo) => {
      expect(authInfo).to.not.be.null;
      expect(authInfo.token).to.not.be.null;
      done();
    });
  });
})
