var MapWrapper = require('../mapWrapper.js')
var ColumnChart = require('./column_chart.js')

var Elevation = function(passedPage){
 this.page = passedPage
 this.map = passedPage.map.mainMap
 this.elevator = new google.maps.ElevationService;

}

Elevation.prototype = {

  setUpButton: function(){
    var button = document.querySelector('#elevation')
    button.addEventListener('click', function(){
      this.createArrayOfPathLatLng(this.useLatLngArrayToGetElevation.bind(this))
    }.bind(this))
    //elevation

  },

getElevation: function(coords, callbackSetVariable){
  var result; 
  this.elevator.getElevationForLocations({
      'locations': coords
    }, function(results, status) {
      if (status === 'OK') {
        // Retrieve the first result
        if (results[0]) {
          result = results
        } else {
          alert('No results found');
        }
      } else {
        alert('Elevation service failed due to: ' + status);
      }
      callbackSetVariable(result)
    }); 
},

createArrayOfPathLatLng: function(callback){
  var pathCoords = this.map.currentRoute.routes[0].overview_path
  var lengthOfRoute = this.map.currentRoute.routes[0].legs[0].distance['text']
  localStorage.setItem('elevationDistance', lengthOfRoute)
  var latLngArray = []
  pathCoords.forEach(function(coords){
    var toPush = {lat: coords.lat(), lng: coords.lng()}
    latLngArray.push(toPush)
  })
  callback(latLngArray)
},

useLatLngArrayToGetElevation: function(latLngArray){
    this.getElevation(latLngArray, function(result){
      var arrayOfElevation = []
      result.forEach(function(obj){
        arrayOfElevation.push(obj.elevation)
      })
      localStorage.setItem('elevationsOfCurrentRoute', arrayOfElevation)
      setTimeout(this.prepareGraphData(), 1000);
    }.bind(this))
}, 

prepareGraphData: function(){
  var chartTitle = "Elevation along route"
  var container = document.querySelector('#elevation-display')
  var elevationString = localStorage.getItem('elevationsOfCurrentRoute')
  elevationArray = elevationString.split(',')
  var distance = localStorage.getItem('elevationDistance')
  distance = distance.match(/\d/g)
  distance = distance.join("");
  var elevationSeries = []
  var distances = []
  var fractionalDist = distance/elevationArray.length

  for(var i = 0; i < elevationArray.length-1; i++){

  elevationSeries.push( [   fractionalDist*i,  +elevationArray[i]   ] );
  distances.push(fractionalDist*i)
  };
  new ColumnChart(container, chartTitle, elevationSeries, distances, "meters")
  }

}
module.exports = Elevation