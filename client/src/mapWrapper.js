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

  addStartClickEvent: function(){
      var startListener = google.maps.event.addListener(this.googleMap, 'click', function(event){
      var startLatitude = event.latLng.lat()
      var startLongitude = event.latLng.lng() 
      localStorage.setItem("startLatitude", startLatitude)
      localStorage.setItem("startLongitude", startLongitude)
      this.addMarker({lat: startLatitude, lng: startLongitude});
      google.maps.event.removeListener(startListener);

    }.bind(this));
  },

  addFinishClickEvent: function(){
      var endListener = google.maps.event.addListener(this.googleMap, 'click', function(event){
      var finishLatitude = event.latLng.lat()
      var finishLongitude = event.latLng.lng() 
      localStorage.setItem("finishLatitude", finishLatitude)
      localStorage.setItem("finishLongitude", finishLongitude)
      this.addMarker({lat: finishLatitude, lng: finishLongitude});
      console.log(finishLatitude, finishLongitude)
      google.maps.event.removeListener(endListener);
    }.bind(this));
  },

  drawRoute:function(directionsResult){
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer({
    draggable: true,
    map:this.googleMap
  })
    directionsService.route(directionsResult, function(res, status){
      if(status== 'OK'){
        directionsDisplay.setDirections(res)
      }
    })
  }
}

module.exports = MapWrapper;