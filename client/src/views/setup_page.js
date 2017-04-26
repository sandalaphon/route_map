var MapWrapper = require('../mapWrapper.js')
var Route = require('../models/route.js')
var Forecast = require('../models/forecast.js')
var Reviews = require('../models/reviews.js')
var WeatherView = require('../models/weather_view')
var weatherView = new WeatherView()
var Clock = require('../models/clock.js')





var Page = function () {
  this.page = document
  this.route = null
  this.currentReviewDisplayed = null
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
    forecast: document.querySelector('#forecast'),
    submitReview: document.querySelector('#submitReview'),
    pause: document.querySelector('#pause'),
    stopOffFood: document.querySelector('#stopOffFood'),
    time_button: document.querySelector('#time_button')
  }
  // ensure containerDiv defined before used in setup of this.map
  var containerDiv = document.querySelector('#main-map')
  this.map = {
    center: {lat: 55.953251, lng: -3.188267},
    containerDiv: containerDiv,
    mainMap: new MapWrapper(containerDiv, {lat: 56.632, lng: -4.180}, 6),
    transportMethod: 'BICYCLING'
  }

  this.clock = new Clock
  this.clock.createAClock()

}

Page.prototype = {

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
      return
    }
    this.map.mainMap.saveRoute.bind(this.map)
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

    // var reviews = new Reviews();

    //forecast function
    this.setButtonEvent('click', this.buttons['forecast'], function(){
    var latitude = localStorage.getItem("finishLatitude");
    var longitude = localStorage.getItem("finishLongitude");
    var url = "http://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&APPID=f66376ebcb0af19199eb5e28d449aaf9";
    var forecast = new Forecast(url).getData(function(weather){
      // Enables swapping between reviews and weather divs
      var reviewsDiv = document.querySelector('#reviews-info');
      reviewsDiv.style.display = 'none';
      var weatherDiv = document.querySelector('#weather-info');
      weatherDiv.style.display = 'initial'
      weatherView.render(weather);
      console.log(weather)
    })

  }) //forecastfunction)
    this.setButtonEvent('click', this.buttons['time_button'], function(){
      var timeInput = document.querySelector('#time_depart').value
      this.clock.hour= +timeInput.substring(0,2)
      this.clock.minute= +timeInput.substring(3)
 
      this.clock.haveUserTime= !this.clock.haveUserTime

    }.bind(this))

    // forecast function
    this.setButtonEvent('click', this.buttons['forecast'], this.showForecast)

    this.setButtonEvent('click', this.buttons['save'], this.saveDisplayedRoute.bind(this))

// <<<<<<< HEAD
//   this.setButtonEvent('click', this.buttons['animationButton'], function(){
//   this.map.mainMap.animateRoute()  
//   }.bind(this))
    
// },

//     getAddressFromGeoCode: function(addressId, callback){
//           var geoCoder = new google.maps.Geocoder;
//            geoCoder.geocode({'placeId': addressId}, function(results, status){
//             console.log("we got here and this is: ", this)
//            if(status==="OK"){
//            if(results[0]){
//               // this.getCountryFromGeoCode(results)
             
//              var streetName =results[0].formatted_address
//              console.log(streetName)
//              console.log("STREET NAME!!", streetName)
//              console.log("results", results)
//            } else {
//                window.alert('No results found');
//              }
//            } else {
//              window.alert('Geocoder failed due to: ' + status + "\nDont click in the sea!");
//          }
//          console.log("streetName",streetName)
//         callback(streetName);

//        }.bind(this))
           
//    },
// =======
    this.setButtonEvent('click', this.buttons['animationButton'], function () {
      this.map.mainMap.animateRoute()
    }.bind(this))

    this.setButtonEvent('click', this.buttons['pause'], function(){this.map.mainMap.pauseAnimation()}.bind(this))
    
    this.setButtonEvent('click', this.buttons['stopOffFood'], function(){
      this.map.mainMap.placesService(this.map.mainMap.animeCoordsArray[0], 3000, 'restaurant')
      this.map.mainMap.googleMap.panTo(this.map.mainMap.animeCoordsArray[0])
      this.map.mainMap.googleMap.setZoom(12)
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

    console.log("get here??", this)
    request.send();

  },

  setupReviews: function(){
    var reviews = new Reviews();
    reviews.setupReviewsHTML();
    var request = new XMLHttpRequest();
    var url = "http://localhost:3000/api/suggested_routes/"
    request.open("GET", url)
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function(){
      if(request.status!== 200){
        console.log('Error')
        return
      }
      var jsonString = request.responseText;
      var parsedResponse = JSON.parse(jsonString)
      var allRouteIds = reviews.findAllRouteIDs(parsedResponse)
      var allReviewsWithIds = reviews.findAllReviewsByGivenId(parsedResponse, allRouteIds);

      console.log(allReviewsWithIds)

      reviews.createHTMLElementsForEachReview(allReviewsWithIds)

    }
    request.send()
  },

  setButtonEvent: function (type, button, callback) {
    button.addEventListener(type, callback)
  }

}

module.exports = Page
