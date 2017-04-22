var MapWrapper = require('./mapWrapper.js')
var Route = require('./models/route.js')
var Page = require('./views/setup_page.js')

var app = function () {
  // localStorage.clear()

  var page = new Page()

  page.setupButtons()

  // var startButton = document.querySelector("#start");
  // var endButton = document.querySelector('#finish');
  // var routeButton = document.querySelector('#route');
  // var cyclingButton = document.querySelector('#cycling');
  // var walkingButton = document.querySelector('#walking');
  // var saveButton = document.querySelector('#save');

  // var center = {lat: 55.953251, lng: -3.188267}
  // var containerDiv = document.querySelector('#main-map')
  // var mainMap = new MapWrapper(containerDiv, center, 5)
  // var transportMethod
  // var routeName
  // var route = null;

  // startButton.addEventListener('click', function(){
  //   mainMap.addStartClickEvent();
  //   })

  // endButton.addEventListener('click', function () {
  //   mainMap.addFinishClickEvent()
  // })

  // cyclingButton.addEventListener('click', function () {
  //   transportMethod = 'BICYCLING'
  // })

  // walkingButton.addEventListener('click', function () {
  //   transportMethod = 'WALKING'
  // })

  // routeButton.addEventListener('click',
    // function () {
    //   var startLatitude = localStorage.getItem('startLatitude') // need better names for storage
    //   var startLongitude = localStorage.getItem('startLongitude') // same here
    //   var finishLatitude = localStorage.getItem('finishLatitude')
    //   var finishLongitude = localStorage.getItem(
    //     'finishLongitude')
    //   var start = {lat: +startLatitude, lng: +startLongitude}
    //   var end = {lat: +finishLatitude, lng: +finishLongitude}
    //   console.log(start, end)
    //   var directions = new Route(start, end, transportMethod)
    //   route = directions.directions()
    //   mainMap.drawRoute(route)
    // })

  saveButton.addEventListener('click', function () {
    if (route) {
      var jsonString = JSON.stringify(route)
      makePostRequest('http://localhost:3000/api/routes', function () {}, jsonString)
    }
  })

  var makeRequest = function (url, callback) {
    var request = new XMLHttpRequest()
    request.open('GET', url)
    request.onload = callback
    request.send()
  }

  var makePostRequest = function (url, callback, payload) {
    // post XMLHTTP reauest
    var request = new XMLHttpRequest()
    request.open('POST', url)
    request.setRequestHeader('Content-Type', 'application/json')
    request.onload = callback
    request.send(payload)
  }

  var requestComplete = function () {
    if (this.status != 200) return
    var jsonString = this.responseText
    countries = JSON.parse(jsonString)
  }
}

window.onload = app
