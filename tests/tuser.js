var chai = require("chai");
var expect = chai.expect;
var authModule = require("../auth.js");
var userModule = require("../user.js");

var domain = "http://127.0.0.1:9000";

describe("User", () => {

  var testUser = {
      name: "jane@jane.com",
      password: "jane"
  };

  var auth;

  before((done) => {
    authModule.getAuthorizationInfo(domain, testUser.name, testUser.password).then((authInfo)=>{
      auth = authInfo;
      done();
    });
  });

  it("should get a list of all upcoming user events", (done) => {
    userModule.getMyEvents(auth).then((events) => {
      expect(events).to.not.be.null
      expect(events).to.not.be.empty
      expect(events[0]).to.contain("title");
      done();
    });
  });

  it("should get a users information", (done) => {
    userModule.getMe(auth).then((me) => {
      expect(me).to.not.be.null
      expect(me).to.contain("firstName");
      expect(me).to.contain("lastName");
      expect(me).to.contain("role");
      done();
    });
  });

})
