var Page = require('./views/setup_page.js')
var Sidebar = require('./views/sidebar.js')
var Elevation = require('./models/elevation.js')
var SuggestionList = require('./views/suggested_list.js')
var MakeRequest = require('./models/make_requests.js')
var Reviews = require('./models/reviews.js')
var GeoLocate = require('./models/geolocate_map.js')


var app = function () {
  localStorage.clear()
  var page = new Page()
// <<<<<<< HEAD
//   var sidebar = new Sidebar(page)

//   page.setupButtons(sidebar)
// =======
  // Elevation
  var elevation = new Elevation(page)
  elevation.setUpButton()


  // SIDEBAR
  // Pass page into sidebar to give access to Page objects and methods
  var sidebar = new Sidebar(page)
  var suggestionList = new SuggestionList(page)
  var geoLocate = new GeoLocate(page.map.mainMap.googleMap)
  sidebar.setup()
  suggestionList.setup()


  // console.log(sidebar)
  // page.setupSideBars(sidebar)

  // REVIEWS

  page.setupReviews()

  // ugly way to give sidebar back to Page object as an attribute after sidebar created
  page.setupButtons(sidebar)
  // centre map on geolocation
  geoLocate.centreMap()

}

window.onload = app
