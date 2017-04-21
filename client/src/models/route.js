 var Route = function(origin, destination, travelMode){
  this.origin = origin;
  this.destination = destination;
  this.travelMode = travelMode;
  this.waypoints = [];
  this.optimizeWaypoints = true;
  // this.provideRouteAlternatives = true;
 } 

 Route.prototype = {
  directions: function(){
    return{
      origin: this.origin,
      destination: this.destination,
      travelMode: this.travelMode,
      waypoints: this.waypoints
          }
  }
 }

 module.exports = Route;