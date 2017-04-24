var MapWrapper = require('../mapWrapper.js')
var Route = require('../models/route.js')
var MakeRequest = require('../models/make_requests.js')
var SuggestionList = require('./suggested_list.js')
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
  var containerDiv = document.querySelector('#main-map')
  this.map = {
    center: {lat: 55.953251, lng: -3.188267},
    containerDiv: containerDiv,
    mainMap: new MapWrapper(containerDiv, {lat: 55.953251, lng: -3.188267}, 5),
    transportMethod: 'BICYCLING'
  }
}

Page.prototype = {

  setupSideBars: function (sidebar) {
    var makeRequest = new MakeRequest()

    sidebar.populateList(makeRequest.makeGetRequest)
    if (sidebar.sidebarHidden) {
      sidebar.sidebarHTMLObject.style.display = 'none'
    } else {
      sidebar.sidebarHTMLObject.style.diplay = 'inline-block'
    }

    var suggestionList = new SuggestionList(this)
    suggestionList.populateList(makeRequest.makeGetRequest)
    suggestionList.sidebarHTMLObject.style.display = 'none'

    var wishlistRevealButton = document.querySelector('#wishlist-button')
    wishlistRevealButton.addEventListener('click', sidebar.revealWishlist)

    var suggestionListRevealButton = document.querySelector('#suggested')
    suggestionListRevealButton.addEventListener('click', suggestionList.revealList)
  },

  findAmenity: function () {
    console.log(this)
    var finLat = localStorage.getItem('finishLatitude')
    var finLng = localStorage.getItem('finishLongitude')
    var coords = {lat: +finLat, lng: +finLng}
    this.googleMap.setZoom(10)
    this.googleMap.setCenter(coords)
    var radius = 10000 // change cycling or walking
    this.placesService(coords, radius, 'restaurant')
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
    this.setButtonEvent('click', this.buttons['forecast'], function () {
      var latitude = localStorage.getItem('finishLatitude')
      var longitude = localStorage.getItem('finishLongitude')
      var url = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&APPID=f66376ebcb0af19199eb5e28d449aaf9'
      var forecast = new Forecast(url).getData(function (weather) {
        weatherView.render(weather)
        console.log(weather)
      })
    }) // forecastfunction)

    this.setButtonEvent('click', this.buttons['save'], function () {
      var routeName = document.querySelector('#routeName').value
      var currentRoute = this.map.mainMap.currentRoute
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
          console.log(routeToSave)
          routeToSave.save()
          console.log(this)
          console.log('about to setup sidebars')
          this.setupSideBars(this.sidebar)
          console.log('just setup sidebars')
        }.bind(this))
      }.bind(this))

      // if( (googleResponse) && (routeName) ){
      //   // create Route and then save it
      //   var routeToSave = new Route(this.originAddress, this.destinationAddress, "not needed")
      //   routeToSave.addName(routeName)
      //   routeToSave.addGoogleResponse(googleResponse)
      //   console.log(routeToSave)
      //   routeToSave.save()
      // }
    }.bind(this))

    // test
    this.setButtonEvent('click', this.buttons['viewsavedRouteButton'], function () {
      var routeName = document.querySelector('#savedRouteName').value
      this.viewRoute(routeName)
    }.bind(this))// we have no idea

    this.setButtonEvent('click', this.buttons['animationButton'], function () {
      this.map.mainMap.animateRoute()
    }.bind(this))
  },

  getAddressFromGeoCode: function (addressId, callback) {
    var geoCoder = new google.maps.Geocoder()
    geoCoder.geocode({'placeId': addressId}, function (results, status) {
      console.log('we got here and this is: ', this)
      if (status === 'OK') {
        if (results[0]) {
              // this.getCountryFromGeoCode(results)

          var streetName = results[0].formatted_address
          console.log(streetName)
          console.log('STREET NAME!!', streetName)
          console.log('results', results)
        } else {
          window.alert('No results found')
        }
      } else {
        window.alert('Geocoder failed due to: ' + status + '\nDont click in the sea!')
      }
      console.log('streetName', streetName)
      callback(streetName)
    }.bind(this))
  },

  setButtonEvent: function (type, button, callback) {
    button.addEventListener(type, callback)
    // console.log(type, button, callback)
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
      console.log('FROM DB: ')
      console.log(directionsServiceObj[0].googleResponse)
      console.log(this)
      console.log(request)
      this.map.mainMap.drawRoute(directionsServiceObj[0].googleResponse)
    }.bind(this)
    console.log('get here??', this)
    request.send()
  }

}

module.exports = Page
