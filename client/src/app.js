var MapWrapper = require('./mapWrapper.js')
var Route = require('./models/route.js')
var Page = require('./views/setup_page.js')

var app = function () {
  // localStorage.clear()

  var page = new Page()

  page.setupButtons()

  // TODO - move this to make_requests.js
  var makeRequest = function (url, callback) {
    var request = new XMLHttpRequest()
    request.open('GET', url)
    request.onload = callback
    request.send()
  }
}

window.onload = app
