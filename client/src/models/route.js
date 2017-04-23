var MakeRequest = require('./make_requests.js')
// GOOGLE MAPS OBJECT FACTORY!

var Route = function (origin, destination, travelMode, name) {
  this.name = name,
  // this.author = author
  this.rating = null
  this.origin = origin,
  this.destination = destination,
  this.waypoints = [],
  this.travelMode = travelMode,
  this.calculatedRoute = {}     // the directions calculated by whatever routing engine is used (google directions)

  this.optimizeWaypoints = true// this.provideRouteAlternatives = true;
}

Route.prototype = {

  directions: function () {
    return {
      origin: this.origin,
      destination: this.destination,
      travelMode: this.travelMode,
      waypoints: this.waypoints
    }
  },

  save: function () {
    var makeRequest = new MakeRequest()
    var jsonString = JSON.stringify(this)
    makeRequest.makePostRequest('http://localhost:3000/api/routes', function () {
      return 'saved'
    }, jsonString)
  }
}

module.exports = Route
