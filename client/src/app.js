var MapWrapper = require('./mapWrapper.js')
var Route = require('./models/route.js')
// var mainMap
var Page = require('./views/setup_page.js')
var Sidebar = require('./views/sidebar.js')
var SuggestionList = require('./views/suggested_list.js')
var MakeRequest = require('./models/make_requests.js')

var app = function () {
  localStorage.clear()

  var page = new Page()
  page.setupButtons()

  // SIDEBAR

  var makeRequest = new MakeRequest();
  var sidebar = new Sidebar(page)

  sidebar.populateList(makeRequest.makeGetRequest)
  sidebar.sidebarHTMLObject.style.display = 'none'

  var suggestionList = new SuggestionList(page)
  suggestionList.populateList(makeRequest.makeGetRequest)
  suggestionList.sidebarHTMLObject.style.display = 'none'

  var wishlistRevealButton = document.querySelector('#wishlist-button')
  wishlistRevealButton.addEventListener('click', sidebar.revealWishlist)

  var suggestionListRevealButton = document.querySelector('#suggested')
  suggestionListRevealButton.addEventListener('click', suggestionList.revealList)
}

window.onload = app
