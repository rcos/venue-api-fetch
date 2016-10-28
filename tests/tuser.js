var chai = require("chai");
var expect = chai.expect;
var authModule = require("../auth.js");
var userModule = require("../user.js");
var Promise = require("bluebird");

var domain = "http://127.0.0.1:3000";

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

    it("should get a users information", (done) => {
        userModule.getMe(auth).then((me) => {
            expect(me).to.not.be.null
            expect(me).to.have.property("firstName");
            expect(me).to.have.property("lastName");
            expect(me).to.have.property("role");
            done();
        }).catch(done);
    });

    it("should get a list of all upcoming user events", (done) => {
        userModule.getMyEvents(auth).then((events) => {
            expect(events).to.not.be.null
            expect(events).to.not.be.empty
            expect(events[0].info).to.have.property("title");
            expect(events[0].courseNumber).to.not.be.null
            expect(events.every((element, index, arr) => {
              return arr.length - 1 == index || new Date(arr[index].info.times[0].start).getTime() <=  new Date(arr[index+1].info.times[0].start).getTime();
            })).to.be.true
            done();
        }).catch(done);
    });

    it("should get a users sections", (done) => {
        userModule.getMySections(auth).then((sections) => {
            expect(sections).to.not.be.null;
            expect(sections[0]).to.have.property('enrollmentPolicy');
            expect(sections[0].students).to.not.be.empty;
            done();
        }).catch(done);
    });

    it("should get a users courses", (done) => {
        userModule.getMyCourses(auth).then((courses) => {
            expect(courses).to.not.be.null;
            expect(courses).to.be.a("array")
            expect(courses[0]).to.have.property('department');
            expect(courses[0]).to.have.property('courseNumber');
            expect(courses[0]).to.have.property('name');
            done();
        }).catch(done);
    });

})
