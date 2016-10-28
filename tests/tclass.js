var chai = require("chai");
var expect = chai.expect;

var domain = "http://127.0.0.1:3001";
var venue = require("../index");

describe("Integration/Module", () => {
  before((done) => {
    venue.authenticate("jane@jane.com", "jane").then(done);
  });

  it("should get user information", (done) => {
    venue.getMe().then(() => done());
  });

  it("should get user events", (done) => {
    venue.getMyEvents().then(() => done());
  });

  it("should get specific event", (done) => {
    venue.getEvent("000000000000000000001000").then(() => done());
  });

  it("should get user submissions", (done) => {
    venue.getMySubmissions().then(() => done());
  });

});
