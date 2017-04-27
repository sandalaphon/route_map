var Route = require('./models/route.js')
var Clock = require('./models/clock.js')

var MapWrapper = function (container, coords, zoom) {
  this.startmarkers = []
  this.restaurantMarkers = []
  this.endmarkers = []
  this.currentRoute = null
  this.googleMap = new google.maps.Map(container, {
    center: coords,
    zoom: zoom
  })
  this.route = null
  this.polyline = null
  this.directionsDisplay = null
  this.animationMarker = null
  this.animationRunning = true
  this.clock = new Clock()
  this.totalSeconds = null
  this.animeTimeSeconds = []
  this.timeouts = []
  this.animeCoordsArray = []
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

  createArrayOfPathLatLng: function () {
    var pathCoords = this.map.currentRoute.route[0].overview_path
    var latLngArray = []
    pathCoords.forEach(function (coords) {
      latLngArray.push(coords)
    })
    return latLngArray
  },

  calculateRoute: function () {
    var startLatitude = localStorage.getItem('startLatitude')
    var startLongitude = localStorage.getItem('startLongitude')
    var finishLatitude = localStorage.getItem('finishLatitude')
    var finishLongitude = localStorage.getItem(
      'finishLongitude')
    var start = {lat: +startLatitude, lng: +startLongitude}
    var end = {lat: +finishLatitude, lng: +finishLongitude}
    this.route = new Route(start, end, this.transportMethod)
    this.mainMap.drawRoute(this.route.directions())
  },

  saveRoute: function () {
    if (this.route) {
      this.route.save()
    }
  },

  clearRoutes: function () {
    this.animeTimeSeconds = []
    this.clock.animationRunning = false
    if (this.directionsDisplay) {
      this.directionsDisplay.setMap(null)
    }
    if (this.polyline) {
      this.polyline.setMap(null)
    }
    if (this.animationMarker) {
      this.animationMarker.setMap(null)
    }

    var marker1 = this.startmarkers.pop()
    if (marker1) marker1.setMap(null)
    var marker2 = this.endmarkers.pop()
    if (marker2) marker2.setMap(null)
    for (var i = 0; i < this.timeouts.length; i++) {
      clearTimeout(this.timeouts[i])
    }
    if (this.restaurantMarkers.length) {
      for (var j = 0; j < this.restaurantMarkers.length; j++) {
        this.restaurantMarkers[j].setMap(null)
      }
      this.restaurantMarkers = []
    }
  },

  drawRoute: function (directionsResult) {
    var directionsService = new google.maps.DirectionsService()
    this.directionsDisplay = new google.maps.DirectionsRenderer({
      draggable: true,
      map: this.googleMap
    })

    directionsService.route(directionsResult, function (res, status) {
      if (status == 'OK') {
        this.directionsDisplay.setDirections(res)
        this.currentRoute = res
        var no_steps = res.routes[0].legs[0].steps.length - 1
        var latitude = res.routes[0].legs[0].steps[no_steps].end_location.lat()
        var longitude = res.routes[0].legs[0].steps[no_steps].end_location.lng()
        localStorage.setItem('finishLongitude', longitude)
        localStorage.setItem('finishLatitude', latitude)
        this.computeTotalDistance(res)
        this.computeEstimatedTime(res)
        // Distance and time update with new route
        this.directionsDisplay.addListener('directions_changed', function () {
          this.currentRoute = this.directionsDisplay.getDirections()
          no_steps = this.currentRoute.routes[0].legs[0].steps.length - 1
          var latitude = this.currentRoute.routes[0].legs[0].steps[no_steps].end_location.lat()
          var longitude = this.currentRoute.routes[0].legs[0].steps[no_steps].end_location.lng()
          localStorage.setItem('finishLatitude', latitude)
          localStorage.setItem('finishLongitude', longitude)
         // Marker disappear upon drag
          var marker1 = this.startmarkers.pop()
          if (marker1) marker1.setMap(null)
          var marker2 = this.endmarkers.pop()
          if (marker2) marker2.setMap(null)
          this.computeTotalDistance(this.currentRoute)
          this.computeEstimatedTime(this.currentRoute)
        }.bind(this))
      }
    }.bind(this))
  },

  computeTotalDistance: function (result) {
    var total = 0
    var myroute = result.routes[0]
    for (var i = 0; i < myroute.legs.length; i++) {
      total += myroute.legs[i].distance.value
    }
    localStorage.setItem('journeyDistance', total / 1000)
    total = total / 1000

    document.getElementById('total').innerHTML = 'Distance:' + "<br />"+ total + ' km'
  },

  computeEstimatedTime: function (result) {
    var totalSeconds = 0
    var myroute = result.routes[0]
    for (var i = 0; i < myroute.legs.length; i++) {
      totalSeconds += myroute.legs[i].duration.value
    }
    this.totalSeconds = totalSeconds
    var remainderSeconds = totalSeconds % 60
    var totalMinutes = (totalSeconds - remainderSeconds) / 60
    var remainderMinutes = totalMinutes % 60
    var hours = (totalMinutes - remainderMinutes) / 60
    document.getElementById('time').innerHTML = "<br />"+'Journey Time: ' + "<br />"+ hours + ' hours' + "<br />" +remainderMinutes + ' minutes'
  },
  
    /// ////////////////////////
/// /  places nearby code now  //////
/// ////////////////////////////
  placesService: function (searchCenterCoords, radius, type) {
    var service = new google.maps.places.PlacesService(this.googleMap)// define map
    service.nearbySearch({
      location: searchCenterCoords,
      radius: radius,
      type: [ type ]
    }, function (results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        var numberToShow = Math.min(results.length, 8)
        for (var i = 0; i < numberToShow; i++) {
          this.createMarker(results[i])
        }
      }
    }.bind(this))
  },

  // see here for types : https://developers.google.com/places/supported_types

  createMarker: function (place) {
    var infowindow = new google.maps.InfoWindow()

    var icon = {
      url: 'http://icons.iconarchive.com/icons/icons-land/points-of-interest/256/Restaurant-Blue-icon.png',
      scaledSize: new google.maps.Size(20, 20)
    }

    var marker = new google.maps.Marker({
      map: this.googleMap,
      size: new google.maps.Size(4, 4),
      position: place.geometry.location,
      animation: google.maps.Animation.DROP,
      icon: icon
    })

    this.restaurantMarkers.push(marker)
    google.maps.event.addListener(marker, 'click', function () {
      infowindow.setContent(place.name)
      infowindow.open(this.googleMap, marker)
    })
  },


  updateClock: function(){
    this.clock.addSeconds( this.animeTimeSeconds[0], this.clock.createAnotherClock())
  },
/////////////////////////////////////////////////////////////////////////
////////////////        ANIMATION START          ////////////////////////
/////////////////////////////////////////////////////////////////////////

  animateRoute: function () {


    var userTime = document.querySelector('#time_depart').value //set time
    this.clock.hour = +userTime.substring(0,2)
    this.clock.minute= +userTime.substring(3)
    /////////////repress anime clears previous
    this.animeCoordsArray = []  //ensure no residual frames 
    this.animeTimeSeconds = []
    for (var i = 0; i < this.timeouts.length; i++) {
      clearTimeout(this.timeouts[i])
    }
    if (this.polyline) {
      this.polyline.setMap(null)
    }
    if (this.animationMarker) {
      this.animationMarker.setMap(null)
    }

    this.autoRefresh(this.googleMap, this.currentRoute.routes[0].overview_path)
  },

  autoRefresh: function (map, pathCoords) {
    if (this.currentRoute.request.travelMode === 'BICYCLING') {
      var icon = {
        url: 'http://www.animatedimages.org/data/media/237/animated-bicycle-image-0001.gif',
        scaledSize: new google.maps.Size(50, 50)
      }
      this.animationMarker = new google.maps.Marker({
        map: this.googleMap,
        optimized: false, // <-- required for animated gif
        animation: google.maps.Animation.DROP,
        icon: icon
      })
    } else {
      var icon = {
        url: 'http://www.animatedimages.org/data/media/1635/animated-walking-image-0066.gif',
        scaledSize: new google.maps.Size(50, 50)
      }
      this.animationMarker = new google.maps.Marker({
        map: this.googleMap,
        optimized: false, // <-- required for animated gif
        animation: google.maps.Animation.DROP,
        icon: icon})
    };

    this.polyline = new google.maps.Polyline({
      path: [],
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2,
      editable: false,
      map: this.googleMap
    })

    var secondsFraction = this.totalSeconds / pathCoords.length
    
    for (var i = 0; i < pathCoords.length; i++) {
      this.animeCoordsArray.push(pathCoords[i])
      this.animeTimeSeconds.push(secondsFraction)
      this.timeouts.push(setTimeout(function (coords) {
        this.polyline.getPath().push(coords)
        this.moveMarker(this.googleMap, this.animationMarker, coords)
        // var currentCoords = {lat: coords.lat(), lng: coords.lng()}
      }.bind(this), 100 * i, pathCoords[i]))
      this.timeouts.push(setTimeout(function (coords) {
        this.polyline.setMap(null)
        this.animationMarker.setMap(null)
      }.bind(this), 100 * pathCoords.length + 1000))
    }
  },

  moveMarker: function (map, marker, latlng) {
    marker.setPosition(latlng)
    var coords = {lat: latlng.lat(), lng: latlng.lng()}
    this.animeCoordsArray.shift()
    this.animeTimeSeconds.shift()
    this.updateClock()
    // finish anime
    if (this.animeCoordsArray.length === 0) {
      setTimeout(function () {
        this.polyline.setMap(null)
        this.animationMarker.setMap(null)
      }, 1000)
    }
  },

  pauseAnimation: function(){
    if(this.animationRunning){
      //iterate through array of timeouts and discard them
    for(var i=0; i<this.timeouts.length; i++){
    clearTimeout(this.timeouts[i])
    } this.animationRunning= false
    this.clock.setAnime(true)
    }else {
   this.animationRunning= true
   this.clock.setAnime(true)
      for(var j = 0; j < this.animeCoordsArray.length; j++ ){
          this.timeouts.push(setTimeout(function (coords) {
          this.polyline.getPath().push(coords)
          this.moveMarker(this.googleMap, this.animationMarker, coords)
        }.bind(this), 100 * j, this.animeCoordsArray[j]))
      }
    }
  },

  /////////////////////////////////////////////////////////////////////////
  ////////////////        ANIMATION END            ////////////////////////
  /////////////////////////////////////////////////////////////////////////


}

module.exports = MapWrapper
