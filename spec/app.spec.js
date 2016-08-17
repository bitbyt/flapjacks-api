var app = require('../app');
var request = require("request");
var supertest = require("supertest");

describe("Express Server", function() {
  describe("GET /", function() {
    it("returns status code 200", function(done) {
      console.log("in get/ test");
      supertest(app)
        .get('/')
        .set('Accept', 'text/html')
        .expect('Content-Type', /html/)
        .expect(200, done); // note that we're passing the done as parameter to the expect
    });

    it("returns status code 200 for /users/sabrina", function(done) {
      console.log("in /users/heysabs test");
      supertest(app)
        .get('/users/heysabs')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done); // note that we're passing the done as parameter to the expect
    });

    it("returns the correct data for /users/jonathan", function(done) {
      console.log("in /users/heysabs test");
      supertest(app)
        .get('/users/heysabs')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, {
          "username":"heysabs",
          "email":"heysabs@gmail.com",
          "website":"http://djsabrina.com"
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

  // describe("GET /about", function() {
  //   it("returns status code 200", function(done) {
  //     request.get(base_url + 'about',
  //       function(err, response, body) {
  //         expect(response.statusCode).toBe(200);
  //         done();
  //       }
  //     );
  //   });
  // });
  //
  // describe("GET /contact", function() {
  //   it("returns status code 200", function(done) {
  //     request.get(base_url + 'contact',
  //       function(err, response, body) {
  //         expect(response.statusCode).toBe(200);
  //         done();
  //       }
  //     );
  //   });
  // });
});
