var app = require('../app');
var request = require("request");
var supertest = require("supertest");

describe("Express Server", function() {
  describe("GET /users", function() {
    it("returns status code 200 for /users/sabrina", function(done) {
      console.log("in /users/heysabs test");
      supertest(app)
        .get('/users/heysabs')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done); // note that we're passing the done as parameter to the expect
    });

    it("returns the correct data for /users/heysabs", function(done) {
      console.log("in /users/heysabs test");
      supertest(app)
        .get('/users/heysabs')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, {
          "_id":"57b2cd2b522b0655506ea20a",
          "username":"heysabs",
          "email":"heysabs@gmail.com",
          "website":"http://djsabrina.com",
          "__v":0,
          "created_at":"2016-08-16T08:22:03.239Z"
        }, done);
    });

    it('returns status 404 when name is not found', function(done) {
      console.log("in 404 test");
      supertest(app)
        .get('/users/junius')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404);
        done();
    });
  });
});
