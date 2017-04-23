var Route = require('./models/route.js')

var MapWrapper = function (container, coords, zoom) {
  this.startmarkers = []
  this.endmarkers = []
  this.currentRoute = null
  this.googleMap = new google.maps.Map(container, {
    center: coords,
    zoom: zoom
  })
  this.route = null
}

MapWrapper.prototype = {

  addDraggableMarker: function (coords) {
    var draggableMarker = new google.maps.Marker({
      position: coords,
      map: this.googleMap,
      draggable: true, // draggable
      animation: google.maps.Animation.DROP
    })
    // Update latLng after drag
    // display coords in infowindow after drag
    google.maps.event.addListener(draggableMarker, 'dragend', function (evt) {
      // contentString for InfoWindow
      var contentString = 'Marker dropped: Current Lat: ' + evt.latLng.lat().toFixed(3) + ' Current Lng: ' + evt.latLng.lng().toFixed(3)
      // Make InfoWindow and open
      var infoWindow = new google.maps.InfoWindow({
        content: contentString
      })

      infoWindow.open(this.googleMap, draggableMarker)
    }.bind(this))
    return draggableMarker
  },

  addMarker: function (coords) {
    var marker = new google.maps.Marker({
      position: coords,
      map: this.googleMap,
      animation: google.maps.Animation.DROP
    })
    return marker
  },

  addStartClickEvent: function () {
    var startListener = google.maps.event.addListener(this.googleMap, 'click', function (event) {
      var startLatitude = event.latLng.lat()
      var startLongitude = event.latLng.lng()
      localStorage.setItem('startLatitude', startLatitude)
      localStorage.setItem('startLongitude', startLongitude)
      if (this.startmarkers.length) {
        var marker = this.startmarkers.pop()
        marker.setMap(null)
      }
      marker = this.addMarker({lat: startLatitude, lng: startLongitude})
      this.startmarkers.push(marker)
      google.maps.event.removeListener(startListener)
    }.bind(this))
  },

  addFinishClickEvent: function () {
    var endListener = google.maps.event.addListener(this.googleMap, 'click', function (event) {
      var finishLatitude = event.latLng.lat()
      var finishLongitude = event.latLng.lng()
      localStorage.setItem('finishLatitude', finishLatitude)
      localStorage.setItem('finishLongitude', finishLongitude)
      var marker = this.endmarkers.pop()
      if (marker) marker.setMap(null)
      marker = this.addMarker({lat: finishLatitude, lng: finishLongitude})
      this.endmarkers.push(marker)
      google.maps.event.removeListener(endListener)
    }.bind(this))
  },

  calculateRoute: function () {
    var startLatitude = localStorage.getItem('startLatitude') // need better names for storage
    var startLongitude = localStorage.getItem('startLongitude') // same here
    var finishLatitude = localStorage.getItem('finishLatitude')
    var finishLongitude = localStorage.getItem(
      'finishLongitude')
    var start = {lat: +startLatitude, lng: +startLongitude}
    var end = {lat: +finishLatitude, lng: +finishLongitude}
    var directions = new Route(start, end, this.transportMethod)
    this.route = directions
    this.route.calculatedRoute = directions.directions()
    this.mainMap.drawRoute(this.route.calculatedRoute)
  },

  saveRoute: function () {
    if (this.route) {
      this.route.calculatedRoute = this.mainMap.currentRoute
      this.route.save()   // this.route is now a Route!
    }
  },

  drawRoute: function (directionsResult) {
    var directionsService = new google.maps.DirectionsService()
    var directionsDisplay = new google.maps.DirectionsRenderer({
      // suppressMarkers: true,
      draggable: true,
      map: this.googleMap
    })

    // directionsDisplay.setMap(this.googleMap);
    directionsService.route(directionsResult, function (res, status) {
      if (status === 'OK') {
        this.currentRoute = directionsDisplay.getDirections()
        directionsDisplay.setDirections(res)
        this.computeTotalDistance(directionsDisplay.getDirections())
        this.computeEstimatedTime(directionsDisplay.getDirections())
        // Distance and time update with new route
        directionsDisplay.addListener('directions_changed', function () {
          this.currentRoute = directionsDisplay.getDirections()
          var marker1 = this.startmarkers.pop()
          if (marker1) marker1.setMap(null)
          var marker2 = this.endmarkers.pop()
          if (marker2) marker2.setMap(null)
          this.computeTotalDistance(directionsDisplay.getDirections())
          this.computeEstimatedTime(directionsDisplay.getDirections())
        }.bind(this))
      }
    }.bind(this))
  },
  // compute total distance and display
  computeTotalDistance: function (result) {
    var total = 0
    var myroute = result.routes[0]
    for (var i = 0; i < myroute.legs.length; i++) {
      total += myroute.legs[i].distance.value
    }
    total = total / 1000
    document.getElementById('total').innerHTML = total + ' km'
  },

  computeEstimatedTime: function (result) {
    var totalSeconds = 0
    var myroute = result.routes[0]
    for (var i = 0; i < myroute.legs.length; i++) {
      totalSeconds += myroute.legs[i].duration.value
    }
    var remainderSeconds = totalSeconds % 60
    var totalMinutes = (totalSeconds - remainderSeconds) / 60
    var remainderMinutes = totalMinutes % 60
    var hours = (totalMinutes - remainderMinutes) / 60

    document.getElementById('time').innerHTML = hours + ' hours ' + remainderMinutes + ' minutes and ' + remainderSeconds + ' seconds'
  }
}

module.exports = MapWrapper
