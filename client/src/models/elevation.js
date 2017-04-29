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
  this.elevator.getElevationForLocations({
      'locations': coords
    }, function(results, status) {
      if (status === 'OK') {
        if (results[0]) {
          callbackSetVariable(results)
        } else {
          alert('No results found')
        }
      } else {
        alert('Elevation service failed due to: ' + status)
      } 
    })
},

createArrayOfPathLatLng: function(callback){
  var pathCoords = this.map.currentRoute.routes[0].overview_path
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
      setTimeout(this.prepareGraphData(), 0);
    }.bind(this))
}, 

prepareGraphData: function(){
  var chartTitle = "Elevation along route"
  var container = document.querySelector('#elevation-display')
  var elevationString = localStorage.getItem('elevationsOfCurrentRoute')
  elevationArray = elevationString.split(',')
  var distance = localStorage.getItem('journeyDistance')

  var elevationSeries = []
  var distances = []
  var fractionalDist = distance/elevationArray.length

  for(var i = 0; i < elevationArray.length-1; i++){
    var distanceSoFar = fractionalDist*(i+1)
    distanceSoFar = distanceSoFar.toFixed(2)
  elevationSeries.push( [  distanceSoFar ,  +elevationArray[i]   ] );
  distances.push(distanceSoFar)
  };
  new ColumnChart(container, chartTitle, elevationSeries, distances, "meters" , "Kilometers")
  }

}
module.exports = Elevation