var expect = require("chai").expect;
var app = require('../app');
var request = require("supertest")(app);

function getsAllLargeAirports(res) {
  if (res.body.length !== 172) throw new Error("Did not return all airports where type is large_airport");
  res.body.forEach(airport => {
  	if (airport.type !== "large_airport") throw new Error("Returned some airports whose type is NOT large_airport");
  });
}

describe("Airports GET", function() {
	
	it("Should return a 200 response", function(done) {
		request
			.get("/api/airports")
      .set('Accept', 'application/json')
			.expect(200, done);
	});

	it("Gets all and only airports where type is large_airport", function(done) {
		request
			.get("/api/airports")
			.set("Accept", "application/json")
	    .expect(getsAllLargeAirports)
	    .end(done);
	});

});