var MapWrapper = require('../mapWrapper.js')
var MakeRequest = require('../models/make_requests.js')

var Sidebar = function (passedPage) {
  this.sidebarHTMLObject = document.querySelector('#sidebar')
  this.sidebarHidden = true
  this.page = passedPage
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

  populateList: function (getAllRoutes) {
    var wishlistUL = document.querySelector('#wishlist')

    while (wishlistUL.hasChildNodes()) {
      wishlistUL.removeChild(wishlistUL.lastChild)
    }

    var sidebarScope = this

    var returnedList = getAllRoutes('http://localhost:3000/api/routes', function () {
      var parsedList = JSON.parse(this.response)
      parsedList.forEach(function (element) {
        var newLi = document.createElement('li')


        newLi.innerText = 'Name: ' + element.name + ' \n\nStart: ' + element.origin + '\n\nFinish: ' + element.destination

        var newBr = document.createElement('br')

        newLi.appendChild(newBr)

        var newATag = document.createElement('a')
        var hrefString = 'http://localhost:3000/api/routes/' + element.name
        newATag.href = hrefString
        newATag.text = 'Route API Details'
        newLi.appendChild(newATag)

        var buttonsDiv = document.createElement('div')
        var divP = document.createElement('p')
        buttonsDiv.appendChild(divP)

        var doneButton = document.createElement('button')
        doneButton.id = 'doneButton'
        doneButton.innerText = 'Done'
        doneButton.onclick = function () {
          // newLi.style.textDecoration = 'line-through'
          if(element.done){
            element.done = false
          }
          else element.done = true
        }

        var deleteRouteFromDB = function (routeID) {
          url = 'http://localhost:3000/api/routes/'
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



          // var mainMap = sidebarScope.page.map.mainMap
          //!BUG! Routes displaying on top of each other, fixed below

          var containerDiv = document.querySelector('#main-map')
      
          var mainMap = new MapWrapper(containerDiv, element.googleResponse.destination, 12)

          mainMap.drawRoute(element.googleResponse)
        })

        newLi.appendChild(divP)
        newLi.appendChild(displayRoute)
        newLi.appendChild(doneButton)
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
