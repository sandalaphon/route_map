var MapWrapper = function(container, coords, zoom){
  this.googleMap = new google.maps.Map(container, {
    center: coords,
    zoom: zoom
  });
}

MapWrapper.prototype ={
  addMarker: function(coords){
    var marker = new google.maps.Marker({
      position: coords,
      map: this.googleMap,
      animation: google.maps.Animation.DROP
    });
    return marker;
  },

  addClickEvent: function(){
    google.maps.event.addListener(this.googleMap, 'click', function(event){
      var latitude = event.latLng.lat()
      var longitude = event.latLng.lng() 
      localStorage.setItem("latitude", latitude)
      localStorage.setItem("longitude", longitude)
      this.addMarker({lat: latitude, lng: longitude});
      console.log(latitude, longitude)
    }.bind(this));
  },

  drawRoute:function(directionsResult){
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;

    directionsService.route(directionsResult)
    directionsDisplay.setMap(this.googleMap);
    // directionsDisplay.setDirections(directionsResult)
    
  }
}

module.exports = MapWrapper;