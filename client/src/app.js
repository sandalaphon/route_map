var MapWrapper = require('./mapWrapper.js')
var Route = require('./models/route.js')


var app = function(){

  
  localStorage.clear();
  var startButton = document.querySelector("#start")
  var endButton = document.querySelector('#finish')
  var routeButton = document.querySelector('#route')
  var center = {lat: 55.953251, lng: -3.188267}
  var containerDiv = document.querySelector("#main-map");
  var mainMap = new MapWrapper(containerDiv, center, 5);
  

  startButton.addEventListener('click', function(){
    mainMap.addStartClickEvent();
    })

  endButton.addEventListener('click', function(){
    mainMap.addFinishClickEvent();
  })

  routeButton.addEventListener('click',
    function(){
      var startLatitude = localStorage.getItem("startLatitude"); //need better names for storage
      var startLongitude = localStorage.getItem("startLongitude"); //same here
      var finishLatitude = localStorage.getItem("finishLatitude");
      var finishLongitude = localStorage.getItem(
        "finishLongitude");
      

      var start = {lat:+startLatitude, lng:+startLongitude}
      var end = {lat:+finishLatitude, lng:+finishLongitude}
      console.log(start, end)
      var directions = new Route(start, end, "BICYCLING")
      var route = directions.directions();
      mainMap.drawRoute(route)
    })
}

window.onload = app;