
var Page = require('./views/setup_page.js')
var Sidebar = require('./views/sidebar.js')
var Elevation = require('./models/elevation.js')


var app = function () {
  localStorage.clear()

  var page = new Page()

  //Elevation



  var elevation = new Elevation(page)
  elevation.setUpButton()

  // SIDEBAR


  // Pass page into sidebar to give access to Page objects and methods

  var sidebar = new Sidebar(page)

  // ugly way to give sidebar back to Page object as an attribute after sidebar created

  page.setupButtons(sidebar)

  // Setup Wishlist SIDEBAR & Suggested Routes Sidebar
  page.setupSideBars(sidebar)

}

window.onload = app
