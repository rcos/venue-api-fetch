var chai = require("chai");
var expect = chai.expect;
var authModule = require("../auth.js");
var eventModule = require("../event.js");

var domain = "http://127.0.0.1:9000";

describe("Event Actions", () => {

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

  it("should get information for an event", (done) => {
    eventModule.getEvent(auth, "000000000000000000001000").then((event) => {
      expect(event).to.not.be.null
      done();
    });
  });

  it("Should get a users information", (done) => {
    userModule.uploadToEvent(auth, {
      filePath: "./assets/testimg1.jpg",
      title: "Wow what a great time!",
      content: "Fun for everyone!"
    }).then((success) => {
      expect(success).to.be.true
      done();
    });
  });

})
