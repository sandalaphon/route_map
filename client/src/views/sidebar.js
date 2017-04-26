// var MapWrapper = require('../mapWrapper.js')
var MakeRequest = require('../models/make_requests.js')
var Route = require('../models/route.js')

var Sidebar = function (passedPage) {
  this.sidebarHTMLObject = document.querySelector('#sidebar')
  this.sidebarHidden = true
  this.page = passedPage
  this.map = passedPage.map.mainMap
}

Sidebar.prototype = {

  setup: function () {
    // Get data to populate wishlist and set to appear/disappear
    var makeRequest = new MakeRequest()
    this.populateList(makeRequest.makeGetRequest)
    this.hideReveal()
    var wishlistRevealButton = document.querySelector('#wishlist-button')
    wishlistRevealButton.addEventListener('click', this.revealWishlist)
  },

  hideReveal: function () {
    if (this.sidebarHidden) {
      this.sidebarHTMLObject.style.display = 'none'
    } else {
      this.sidebarHTMLObject.style.diplay = 'inline-block'
    }
  },

  addCloseAction: function (htmlElement) {
    htmlElement.onclick = function () {
      this.hideReveal()
    }.bind(this)
  },

  populateList: function (getAllRoutes) {
    var wishlistUL = document.querySelector('#wishlist')

    this.addCloseAction(document.querySelector('#sidebar-close'))  // using span id=sidebar-close

    while (wishlistUL.hasChildNodes()) {
      wishlistUL.removeChild(wishlistUL.lastChild)
    }

    var sidebarScope = this

    var returnedList = getAllRoutes('http://localhost:3000/api/routes', function () {
      var parsedList = JSON.parse(this.response)
      parsedList.forEach(function (element) {
        var newLi = document.createElement('li')

        newLi.innerHTML = '<p class="route-name">' + element.name + '</p>' + '<p class="travel-mode">' + element.googleResponse.travelMode + '</p>'

        var startFinish = document.createElement('p')
        startFinish.className = 'start-finish'
        startFinish.innerHTML = '<span class="from-to">From: </span>' + element.origin + '<br>' + '<span class="from-to"> To: </span>' + element.destination
        newLi.appendChild(startFinish)

        var buttonsDiv = document.createElement('div')
        var divP = document.createElement('p')
        buttonsDiv.appendChild(divP)

        var doneButton = document.createElement('button')
        doneButton.id = 'doneButton' + element._id
        doneButton.innerText = 'Done'
        var label = document.createElement('label')
        var checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        checkbox.id = 'checkbox' + element._id
        checkbox.value = element._id
        checkbox.checked = element.done
        label.for = element._id
        label.innerHTML = element.name

        doneButton.onclick = function () {
          // newLi.style.textDecoration = 'line-through'
          var payload = { 'done': false}
          if (element.done) {
            element.done = false
            checkbox.checked = false
            payload.done = false
          } else {
            element.done = true
            checkbox.checked = true
            payload.done = true
          }
          var makeRequest = new MakeRequest()
          var putUrl = 'http://localhost:3000/api/routes/' + element._id
          console.log(putUrl, element, element._id, element.done, checkbox.checked)
          makeRequest.makePutRequest(putUrl, function (request) {
            // should update checkbox for element here after confirmation update succeeded
            if (request.status !== 200) console.log(request.status)            // get checkbox for ID
            // set checkbox state to match
            // finish
          }, payload)
        }

        var deleteRouteFromDB = function (routeID) {
          var url = 'http://localhost:3000/api/routes/'
          url += routeID
          var request = new XMLHttpRequest()
          request.open('DELETE', url)
          request.send()
        }

        var deleteButton = document.createElement('button')
        deleteButton.id = 'deleteButton'
        deleteButton.innerText = 'Delete'
        deleteButton.addEventListener('click', function () {
          deleteRouteFromDB(element._id)
          newLi.style.display = 'none'
        })

        var displayRoute = document.createElement('button')
        displayRoute.id = 'sidebarDisplayRouteButton'
        displayRoute.innerText = 'Display Route'
        displayRoute.addEventListener('click', function () {
          var mainMap = sidebarScope.page.map.mainMap
          //! BUG! Routes displaying on top of each other, fixed below

          // FIX ME TOMORROW!
          var containerDiv = document.querySelector('#main-map')

          // mainMap = new MapWrapper(containerDiv, element.googleResponse.destination, 12)
          sidebarScope.hideReveal()
          mainMap.clearRoutes()
          mainMap.drawRoute(element.googleResponse)
        })

        newLi.appendChild(divP)
        newLi.appendChild(displayRoute)
        newLi.appendChild(doneButton)
        newLi.appendChild(checkbox)
        newLi.appendChild(deleteButton)
        wishlistUL.appendChild(newLi)

        var listBr = document.createElement('br')
        wishlistUL.appendChild(listBr)
      })
    })
  },

  revealWishlist: function () {
    var sidebar = document.querySelector('#sidebar')
    if (sidebar.style.display === 'inline-block') {
      sidebar.style.display = 'none'
      this.sidebarHidden = true
    } else if (sidebar.style.display === 'none') {
      sidebar.style.display = 'inline-block'
      this.sidebarHidden = false
    }
  }
}

module.exports = Sidebar
