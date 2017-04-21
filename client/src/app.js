var MapWrapper = require('./mapWrapper.js')
var Route = require('./models/route.js')

var app = function(){
  var center = {lat: 55.953251, lng: -3.188267}
  var containerDiv = document.querySelector("#main-map");
  var mainMap = new MapWrapper(containerDiv, center, 5);
  var startLatitude = localStorage.getItem("latitude"); //need better names for storage
  var startLongitude = localStorage.getItem("longitude"); //same here
  // var start = {lat:startLatitude, lng:startLongitude}
  var end = {lat: 56, lng: -3.2}
  mainMap.addClickEvent();
  
  // var url = "https://maps.googleapis.com/maps/api/directions/json?origin=" + startLatitude + ","+ startLongitude + "&destination= 56.00,-3.2" + "&key=AIzaSyDCSDO8jpfOiO7nJ3wjAoFsER6BXyN8QWo&sensor=false"
  // var route = new Route(url).getData(function(directionsResult){
  //    mainMap.drawRoute(directionsResult)  

  // })
  var directions = {
    origin: {lat: 56, lng: -3.2},
    destination: {lat: 52, lng: -3},
    travelMode: "BICYCLING"
  }
  
  mainMap.drawRoute(directions)
}

window.onload = app;