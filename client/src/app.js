// var MapWrapper = require('./mapWrapper.js')
// var Route = require('./models/route.js')
// var mainMap
var Page = require('./views/setup_page.js')
var Sidebar = require('./views/sidebar.js')
// var SuggestionList = require('./views/suggested_list.js')
// var MakeRequest = require('./models/make_requests.js')

var app = function () {
  // localStorage.clear()

  var page = new Page()
  // Pass page into sidebar to give access to Page objects and methods
  var sidebar = new Sidebar(page)

  // ugly way to give sidebar back to Page object as an attribute after sidebar created
  page.setupButtons(sidebar)

  // SIDEBAR

  // console.log(sidebar)
  page.setupSideBars(sidebar)
}

window.onload = app
