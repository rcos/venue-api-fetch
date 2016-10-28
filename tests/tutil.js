var chai = require("chai");
var expect = chai.expect;
var assert = chai.assert;
var venue = require("../index");

var domain = "http://127.0.0.1:3001";

describe("Utility functions", () => {

  venue.setDomain(domain);

  it("should get the venue domain", () => {
    assert(venue.getDomain() == domain);
  });

  it("should get the signup URL", () => {
    assert(venue.getSignupURL() == "http://127.0.0.1:3001/student/signup");
  });
})
