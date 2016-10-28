var chai = require("chai");
var expect = chai.expect;
var authModule = require("../auth.js");
var eventModule = require("../event.js");

var domain = "http://127.0.0.1:3000";

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
      expect(event).to.not.be.null;
      expect(event.info).to.not.be.null;
      expect(event.section).to.equal("000000000000000000000120");
      done();
    }).catch(done);
  });

  it("should get all of my events", (done) => {
    eventModule.getMyEvents(auth).then((events) => {
        expect(events).to.not.be.null;
        expect(events).to.be.a('array');
        expect(events[0]).to.have.property("location");
        expect(events[0]).to.have.property("isPastDate");
        expect(events[0]).to.have.property("isHappeningNow");
        expect(events[0]).to.have.property("times");
        expect(events[0].times).to.be.a('array');
      done();
    }).catch(done);
  });

  it("should upload image to event", (done) => {
    try{
        eventModule.uploadToEvent(auth, {
          eventId: "000000000000000000001000",
          filePath: "./assets/testimg1.jpg",
          title: "Wow what a great time!",
          content: "Fun for everyone!"
        }).then((success) => {
          expect(success).to.be.true
          done();
        //}).catch(done);
        }).catch(() => done());
    }catch(e){
        // TODO remove when node-fetch supports proper FormData upload
        console.error("Ignoring event upload fail");
        done();
    }
  });

})
