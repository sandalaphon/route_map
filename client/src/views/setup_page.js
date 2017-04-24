var MapWrapper = require('../mapWrapper.js')
var Route = require('../models/route.js')

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
    animationButton: document.querySelector('#animate')
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

  setupButtons: function () {
    this.setButtonEvent('click', this.buttons['start'], this.map.mainMap.addStartClickEvent.bind(this.map.mainMap))
    this.setButtonEvent('click', this.buttons['end'], this.map.mainMap.addFinishClickEvent.bind(this.map.mainMap))
    this.setButtonEvent('click', this.buttons['cycling'], function () {
      this.map.transportMethod = 'BICYCLING'
    }.bind(this))
    this.setButtonEvent('click', this.buttons['walking'], function () {
      this.map.transportMethod = 'WALKING'
    }.bind(this))
    this.setButtonEvent('click', this.buttons['findAmenity'], function(){
      var finLat = localStorage.getItem('finishLatitude')
      var finLng = localStorage.getItem('finishLongitude')
      console.log(finLat)

      var coords = {lat: +finLat, lng: +finLng}
      this.map.mainMap.googleMap.setZoom(10),
      this.map.mainMap.googleMap.setCenter(coords)
      console.log("coords",coords)
      var radius = 10000 //change cycling or walking
      this.map.mainMap.placesService(coords, radius, "restaurant")
    }.bind(this))
    this.setButtonEvent('click', this.buttons['route'], this.map.mainMap.calculateRoute.bind(this.map))
    //

    this.setButtonEvent('click', this.buttons['save'], function(){
    var routeName = document.querySelector('#routeName').value 
    var currentRoute = this.map.mainMap.currentRoute
    if(!routeName){
      alert("Please enter a route Name");
      this.map.mainMap.saveRoute.bind(this.map)
      }
      var googleResponse = this.map.mainMap.currentRoute.request      //save if route is named and defined
      
      console.log("this.map.mainMap.currentRoute.request", this.map.mainMap.currentRoute.request)
      
      if((googleResponse)&&(routeName)){
        // create Route and then save it
        var routeToSave = new Route ("not needed", "not needed", "not needed")
        routeToSave.addName(routeName)
        routeToSave.addGoogleResponse(googleResponse)
        console.log(routeToSave)
        routeToSave.save()
      }
      }.bind(this))

    //test
    this.setButtonEvent('click', this.buttons['viewsavedRouteButton'], function(){
    var routeName = document.querySelector('#savedRouteName').value
    this.viewRoute(routeName)
  }.bind(this))// we have no idea

      this.setButtonEvent('click', this.buttons['animationButton'], function(){
      this.map.mainMap.animateRoute()
      
    }.bind(this))
    
  },

  setButtonEvent: function (type, button, callback) {
    button.addEventListener(type, callback)
    // console.log(type, button, callback)
  },
  
  viewRoute: function(routeName){
    var request = new XMLHttpRequest();
    var url = "http://localhost:3000/api/routes/"+routeName
    request.open("GET", url);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function(){
      if(request.status!== 200) {
        alert("Not Found")
        return}
        var jsonString = request.responseText;
      var directionsServiceObj = JSON.parse(jsonString);
      console.log("FROM DB: ")
      console.log(directionsServiceObj[0].googleResponse)
      console.log(this)
      console.log(request)
      this.map.mainMap.drawRoute(directionsServiceObj[0].googleResponse)
    }.bind(this)
    console.log("get here??", this)
    request.send();

  }

}



module.exports = Page

