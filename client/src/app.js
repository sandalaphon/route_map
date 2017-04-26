var MapWrapper = require('./mapWrapper.js')
var Route = require('./models/route.js')
// var mainMap
var Page = require('./views/setup_page.js')
var Sidebar = require('./views/sidebar.js')
var SuggestionList = require('./views/suggested_list.js')
var MakeRequest = require('./models/make_requests.js')
var Reviews = require('./models/reviews.js')

var app = function () {
  localStorage.clear()

  var page = new Page()
  var sidebar = new Sidebar(page)

  page.setupButtons(sidebar)

  // SIDEBAR

  console.log(sidebar)
  page.setupSideBars(sidebar)

  // REVIEWS

  page.setupReviews()

}

window.onload = app
