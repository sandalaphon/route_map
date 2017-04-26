var MakeRequest = require('../models/make_requests.js')

var SuggestionList = function (passedPage) {
  this.sidebarHTMLObject = document.querySelector('#suggested-routes')
  this.suggestionListHidden = true
  this.page = passedPage
}

SuggestionList.prototype = {

  setup: function () {
    // Get data to populate wishlist and set to appear/disappear
    var makeRequest = new MakeRequest()
    this.populateList(makeRequest.makeGetRequest)
    this.hideReveal()
    var suggestionListRevealButton = document.querySelector('#suggested')
    suggestionListRevealButton.addEventListener('click', this.revealList)
  },

  hideReveal: function () {
    if (this.suggestionListHidden) {
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
    var suggestedlistUL = document.querySelector('#suggested-list')

    this.addCloseAction(document.querySelector('#suggested-close'))  // using span id=sidebar-close

    while (suggestedlistUL.hasChildNodes()) {
      suggestedlistUL.removeChild(suggestedlistUL.lastChild)
    }

    var suggestionsListScope = this

    var returnedList = getAllRoutes('http://localhost:3000/api/suggested_routes', function () {
      var parsedList = JSON.parse(this.response)
      parsedList.forEach(function (element) {
        var newLi = document.createElement('li')

        newLi.innerHTML = '<p class="route-name">' + element.name + '</p>' + '<p class="travel-mode">' + element.googleResponse.travelMode + '</p>'

        var buttonsDiv = document.createElement('div')
        var divP = document.createElement('p')
        buttonsDiv.appendChild(divP)

        var doneButton = document.createElement('button')
        doneButton.id = 'doneButton'
        doneButton.innerText = 'Done'
        doneButton.onclick = function () {
          newLi.style.textDecoration = 'line-through'
        }

        var displayRoute = document.createElement('button')
        displayRoute.id = 'suggestionsDisplayRouteButton'
        displayRoute.innerText = 'Display Route'

        // var listScope = this;

        displayRoute.addEventListener('click', function () {
          var mainMap = suggestionsListScope.page.map.mainMap
          suggestionsListScope.hideReveal()
          mainMap.clearRoutes()
          mainMap.drawRoute(element.googleResponse)
        })

        newLi.appendChild(divP)
        newLi.appendChild(displayRoute)
        newLi.appendChild(doneButton)
        suggestedlistUL.appendChild(newLi)

        var listBr = document.createElement('br')
        suggestedlistUL.appendChild(listBr)
      })
    })
  },

  revealList: function () {
    var suggestionList = document.querySelector('#suggested-routes')
    if (suggestionList.style.display === 'inline-block') {
      suggestionList.style.display = 'none'
      this.suggestionListHidden = true
    } else if (suggestionList.style.display === 'none') {
      suggestionList.style.display = 'inline-block'
      this.suggestionListHidden = false
    }
  }
}

module.exports = SuggestionList
