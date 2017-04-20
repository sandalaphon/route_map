var MapWrapper = require('./mapWrapper.js')

var app = function(){
  var center = {lat: 55.953251, lng: -3.188267}
  var containerDiv = document.querySelector("#main-map");
  var mainMap = new MapWrapper(containerDiv, center, 5);
}

window.onload = app;