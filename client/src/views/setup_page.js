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
    savedRouteButton: document.querySelector('#savedRoute')
  }
  var containerDiv = document.querySelector('#main-map')
  this.map = {
    center: {lat: 55.953251, lng: -3.188267},
    containerDiv: containerDiv,
    mainMap: new MapWrapper(containerDiv, {lat: 55.953251, lng: -3.188267}, 5),
    transportMethod: 'BICYCLING'
  }

  sessionStorage.setItem('saved-map', this.map.mainMap);
  sessionStorage.setItem('saved-map2', "hello");

  console.log(this.map.mainMap)
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
  //   this.setButtonEvent('click', this.buttons['savedRoute'], function(){
  //   var routeName = document.querySelector('#savedRouteName').value
  //   viewRoute(routeName)
  // }.bind(this))// we have no idea
    //
  },

  setButtonEvent: function (type, button, callback) {
    button.addEventListener(type, callback)
    // console.log(type, button, callback)
  }

}

var viewRoute  = function(routeName){
  var request = new XMLHttpRequest();
  var url = "http://localhost:3000/api/routes/name/" + routeName
  request.open("GET", url);
  request.setRequestHeader("Content-Type", "application/json");
  request.onload = function(){
    if(this.status!== 200) {
      alert("Not Found")
      return}
      var jsonString = this.responseText;
    var directionsServiceObj = JSON.parse(jsonString);
    console.log("FROM DB: ")
    console.log(directionsServiceObj[0].routeObject)
    // mainMap.renderToScreen(directionsServiceObj[0].routeObject)
    this.map.mainMap.drawRoute(directionsServiceObj[0].routeObject.request)
  }
  request.send();
}

module.exports = Page

