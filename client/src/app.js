var MapWrapper = require('./mapWrapper.js')
var Route = require('./models/route.js')
var Page = require('./views/setup_page.js')

var app = function () {
  // localStorage.clear()

  var page = new Page()

  page.setupButtons()

  saveButton.addEventListener('click', function () {
    if (route) {
      var jsonString = JSON.stringify(route)
      makePostRequest('http://localhost:3000/api/routes', function () {}, jsonString)
    }
  })

  var makeRequest = function (url, callback) {
    var request = new XMLHttpRequest()
    request.open('GET', url)
    request.onload = callback
    request.send()
  }

  var makePostRequest = function (url, callback, payload) {
    // post XMLHTTP reauest
    var request = new XMLHttpRequest()
    request.open('POST', url)
    request.setRequestHeader('Content-Type', 'application/json')
    request.onload = callback
    request.send(payload)
  }

  var requestComplete = function () {
    if (this.status != 200) return
    var jsonString = this.responseText
    countries = JSON.parse(jsonString)
  }
}

window.onload = app
