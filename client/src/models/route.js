var MakeRequest = require('./make_requests.js')
// GOOGLE MAPS OBJECT FACTORY!

var Route = function (origin, destination, travelMode) {
  this.name = null,
  // this.author = author
  this.rating = null,
  this.origin = origin,
  this.destination = destination,
  this.waypoints = [],
  this.travelMode = travelMode,
  this.googleResponse = null,
  this.optimizeWaypoints = true// this.provideRouteAlternatives = true;
}

Route.prototype = {

  addName: function(name){
    this.name = name
  },

  addGoogleResponse: function(directionServiceResponse){
    this.googleResponse = directionServiceResponse
  },

  directions: function () {
    return {
      origin: this.origin,
      destination: this.destination,
      travelMode: this.travelMode,
      waypoints: this.waypoints
    }
  },

  save: function () {
    var jsonString = JSON.stringify(this)
    var makeRequest = new MakeRequest()
    makeRequest.makePostRequest('http://localhost:3000/api/routes', function () {}, jsonString)
  },


}

module.exports = Route
