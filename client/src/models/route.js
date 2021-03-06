var MakeRequest = require('./make_requests.js')
// GOOGLE MAPS OBJECT FACTORY!

var Route = function (origin, destination, travelMode) {
  this.url = 'http://localhost:3000/api/routes'
  this.name = null
  // this.author = author
  this.rating = null
  this.done = false
  this.origin = origin
  this.destination = destination
  this.waypoints = []
  this.travelMode = travelMode
  // this.avoidHighways = true,
  // this.avoidTolls = true,
  this.calculatedRoute = {}     // the directions calculated by whatever routing engine is used (google directions)  // think we can lose this
  this.googleResponse = null

  this.optimizeWaypoints = true  // this.provideRouteAlternatives = true;
}

Route.prototype = {

  addName: function (name) {
    this.name = name
  },

  addGoogleResponse: function (directionServiceResponse) {
    this.googleResponse = directionServiceResponse
  },

  directions: function () {
    return {
      origin: this.origin,
      destination: this.destination,
      travelMode: this.travelMode,
      waypoints: this.waypoints,
      avoidHighways: this.avoidHighways,
      avoidTolls: this.avoidTolls
    }
  },

  save: function () {
    var makeRequest = new MakeRequest()
    var jsonString = JSON.stringify(this)
    makeRequest.makePostRequest(this.url, function () {
      return 'saved'
    }, jsonString)
  }

  // getAllRoutes: function (callback) {
  //   var request = new XMLHttpRequest()
  //   request.open('GET', this.url)
  //   request.onload = function () {
  //     if (request.status !== 200) return
  //     var jsonString = request.responseText
  //     var routes = JSON.parse(jsonString)
  //     callback(routes)
  //   }
  //   request.send()
  // }

}

module.exports = Route
