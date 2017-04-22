var Route = require('./models/route.js')

var MapWrapper = function(container, coords, zoom){
  this.googleMap = new google.maps.Map(container, {
    center: coords,
    zoom: zoom
  });
}

MapWrapper.prototype ={

  addDraggableMarker: function(coords){
    var draggableMarker = new google.maps.Marker({
      position: coords,
      map: this.googleMap,
      draggable: true, //draggable
      animation: google.maps.Animation.DROP
    });
    // Update latLng after drag
    // display coords in infowindow after drag
    google.maps.event.addListener(draggableMarker, 'dragend', function(evt){
      // contentString for InfoWindow
      var contentString = 'Marker dropped: Current Lat: ' + evt.latLng.lat().toFixed(3) + ' Current Lng: ' + evt.latLng.lng().toFixed(3)
      //Make InfoWindow and open
      var infoWindow = new google.maps.InfoWindow({
        content: contentString
      })

      infoWindow.open(this.googleMap,draggableMarker);
    
    }.bind(this));
    return draggableMarker;
  },

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
      map: this.googleMap
    });
  

    // directionsDisplay.setMap(this.googleMap);


    directionsService.route(directionsResult, function(res, status){
      if(status== 'OK'){
        directionsDisplay.setDirections(res)
        this.computeTotalDistance(directionsDisplay.getDirections());
        this.computeEstimatedTime(directionsDisplay.getDirections());
        //Distance and time update with new route
        directionsDisplay.addListener('directions_changed', function() {
                  this.computeTotalDistance(directionsDisplay.getDirections());
                  this.computeEstimatedTime(directionsDisplay.getDirections());
                }.bind(this));
      }
    }.bind(this)) 
  },
  // compute total distance and display
   computeTotalDistance: function(result) {
          var total = 0;
          var myroute = result.routes[0];
          for (var i = 0; i < myroute.legs.length; i++) {
            total += myroute.legs[i].distance.value;
          }
          total = total / 1000;
          document.getElementById('total').innerHTML = total + ' km';
        },

    computeEstimatedTime: function(result) {
           var totalSeconds = 0;
           var myroute = result.routes[0];
           for (var i = 0; i < myroute.legs.length; i++) {
             totalSeconds += myroute.legs[i].duration.value;
           }
           var remainderSeconds = totalSeconds%60
           var totalMinutes = (totalSeconds-remainderSeconds)/60
           var remainderMinutes = totalMinutes%60
           var hours = (totalMinutes-remainderMinutes)/60

           document.getElementById('time').innerHTML = hours + ' hours '+ remainderMinutes +' minutes and ' + remainderSeconds + ' seconds';
         }
}

module.exports = MapWrapper;