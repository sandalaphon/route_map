var GeoLocate = function (map) {
  this.map = map
  console.log(this)
  console.log(this.map)
}

GeoLocate.prototype = {
  // Try HTML5 geolocation.  Cribbed from Google example
  centreMap: function (map) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        var infoWindow = new google.maps.InfoWindow()
        infoWindow.setPosition(pos)
        infoWindow.setContent('Location found.')
        infoWindow.open(map)
        console.log(this)
        map.setCenter(pos)
      }, function () {
        this.handleLocationError(true, infoWindow, map.getCenter())
      })
    } else {
      // Browser doesn't support Geolocation
      this.handleLocationError(false, infoWindow, map.getCenter())
    }
    console.log('at end this = ', this)
  },

  handleLocationError: function (browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos)
    infoWindow.setContent(browserHasGeolocation
                          ? 'Error: The Geolocation service failed.'
                          : 'Error: Your browser doesn\'t support geolocation.')
    infoWindow.open(this.map)
  }
}

module.exports = GeoLocate
