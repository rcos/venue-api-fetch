var chai = require("chai");
var expect = chai.expect;
var authModule = require("../auth.js");
var submissionModule = require("../submission.js");

var domain = "http://127.0.0.1:3000";

describe("Submission tests", () => {

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

  it("should get user submissions", (done) => {
    submissionModule.getMySubmissions(auth).then((submissions) => {
      expect(submissions).to.be.a('array');
      expect(submissions[0]).to.have.property("_id");
      expect(submissions[0]).to.have.property("content");
      done();
    }).catch(done);
  });

})
