var MapWrapper = require('../mapWrapper.js')
var Route = require('../models/route.js')
// var MakeRequest = require('../models/make_requests.js') // moved to sidebar and suggestionlist setup() functions
// var SuggestionList = require('./suggested_list.js')
var Forecast = require('../models/forecast.js')
var WeatherView = require('../models/weather_view')
var weatherView = new WeatherView()

var Page = function () {
  this.page = document
  this.route = null
  this.buttons = {
    start: document.querySelector('#start'),
    end: document.querySelector('#finish'),
    route: document.querySelector('#route'),
    cycling: document.querySelector('#cycling'),
    walking: document.querySelector('#walking'),
    save: document.querySelector('#save'),
    findAmenity: document.querySelector('#findAmenity'),
    viewsavedRouteButton: document.querySelector('#savedRoute'),
    animationButton: document.querySelector('#animate'),
    forecast: document.querySelector('#forecast')
  }
  // ensure containerDiv defined before used in setup of this.map
  var containerDiv = document.querySelector('#main-map')
  this.map = {
    center: {lat: 55.953251, lng: -3.188267},
    containerDiv: containerDiv,
    mainMap: new MapWrapper(containerDiv, {lat: 55.953251, lng: -3.188267}, 5),
    transportMethod: 'BICYCLING'
  }
}

Page.prototype = {

  /* setupSideBars: function (sidebar) {
    // moved function to Sidebar.setup() and SuggestionList.setup()
  }, */

  findAmenity: function () {
    var finLat = localStorage.getItem('finishLatitude')
    var finLng = localStorage.getItem('finishLongitude')
    var coords = {lat: +finLat, lng: +finLng}
    this.googleMap.setZoom(10)
    this.googleMap.setCenter(coords)
    var radius = 10000 // change cycling or walking
    this.placesService(coords, radius, 'restaurant')
  },

  showForecast: function () {
    var latitude = localStorage.getItem('finishLatitude')
    var longitude = localStorage.getItem('finishLongitude')
    var url = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&APPID=f66376ebcb0af19199eb5e28d449aaf9'
    var forecast = new Forecast(url).getData(function (weather) {
      weatherView.render(weather)
    }) // forecastfunction)
  },

  saveDisplayedRoute: function () {
    var routeName = document.querySelector('#routeName').value
    // var currentRoute = this.map.mainMap.currentRoute
    if (!routeName) {
      alert('Please enter a route Name')
      this.map.mainMap.saveRoute.bind(this.map)
    }
    var googleResponse = this.map.mainMap.currentRoute.request      // save if route is named and defined
    var originAddressId = this.map.mainMap.currentRoute.geocoded_waypoints[0].place_id
    var destinationAddressId = this.map.mainMap.currentRoute.geocoded_waypoints[this.map.mainMap.currentRoute.geocoded_waypoints.length - 1].place_id

    this.getAddressFromGeoCode(destinationAddressId, function (streetName) {
      var destinationAddress = streetName

      this.getAddressFromGeoCode(originAddressId, function (streetName) {
        var routeToSave = new Route(streetName, destinationAddress, 'not needed')
        routeToSave.addName(routeName)
        routeToSave.addGoogleResponse(googleResponse)
        routeToSave.save()
        this.sidebar.setup()
      }.bind(this))
    }.bind(this))
  },

  setupButtons: function (sidebar) {
    this.sidebar = sidebar
    this.setButtonEvent('click', this.buttons['start'], this.map.mainMap.addStartClickEvent.bind(this.map.mainMap))
    this.setButtonEvent('click', this.buttons['end'], this.map.mainMap.addFinishClickEvent.bind(this.map.mainMap))
    this.setButtonEvent('click', this.buttons['cycling'], function () {
      this.map.transportMethod = 'BICYCLING'
    }.bind(this))
    this.setButtonEvent('click', this.buttons['walking'], function () {
      this.map.transportMethod = 'WALKING'
    }.bind(this))
    this.setButtonEvent('click', this.buttons['findAmenity'], this.findAmenity.bind(this.map.mainMap))
    this.setButtonEvent('click', this.buttons['route'], this.map.mainMap.calculateRoute.bind(this.map))

    // forecast function
    this.setButtonEvent('click', this.buttons['forecast'], this.showForecast)

    this.setButtonEvent('click', this.buttons['save'], this.saveDisplayedRoute.bind(this))

    this.setButtonEvent('click', this.buttons['animationButton'], function () {
      this.map.mainMap.animateRoute()
    }.bind(this))
  },

  getAddressFromGeoCode: function (addressId, callback) {
    var geoCoder = new google.maps.Geocoder()
    geoCoder.geocode({'placeId': addressId}, function (results, status) {
      if (status === 'OK') {
        if (results[0]) {
          var streetName = results[0].formatted_address
        } else {
          window.alert('No results found')
        }
      } else {
        window.alert('Geocoder failed due to: ' + status + '\nDont click in the sea!')
      }
      callback(streetName)
    })
  },

  viewRoute: function (routeName) {
    var request = new XMLHttpRequest()
    var url = 'http://localhost:3000/api/routes/' + routeName
    request.open('GET', url)
    request.setRequestHeader('Content-Type', 'application/json')
    request.onload = function () {
      if (request.status !== 200) {
        alert('Not Found')
        return
      }
      var jsonString = request.responseText
      var directionsServiceObj = JSON.parse(jsonString)
      this.map.mainMap.drawRoute(directionsServiceObj[0].googleResponse)
    }.bind(this)
    request.send()
  },
  setButtonEvent: function (type, button, callback) {
    button.addEventListener(type, callback)
  }

}

module.exports = Page
