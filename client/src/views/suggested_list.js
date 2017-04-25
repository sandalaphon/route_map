var SuggestionList = function (passedPage) {
  this.sidebarHTMLObject = document.querySelector('#suggested-routes')
  this.suggestionListHidden = true;
  this.page = passedPage;
}

SuggestionList.prototype = {

  populateList: function (getAllRoutes) {
    var suggestedlistUL = document.querySelector('#suggested-list')
    
    while (suggestedlistUL.hasChildNodes()) {
        suggestedlistUL.removeChild(suggestedlistUL.lastChild);
    }

    var suggestionsListScope = this;

    var returnedList = getAllRoutes('http://localhost:3000/api/suggested_routes', function () {
      var parsedList = JSON.parse(this.response)
      parsedList.forEach(function (element) {
        var newLi = document.createElement('li')

        console.log('ELEMENT', element)
        newLi.innerText = 'Name of Route:\n' + element.name + ' \n' + element.googleResponse.travelMode

        var newBr = document.createElement('br')
        newLi.appendChild(newBr)

        var newATag = document.createElement('a')
        var hrefString = 'http://localhost:3000/api/suggested_routes/' + element.name
        newATag.href = hrefString
        newATag.text = 'Map Link Here'
        newLi.appendChild(newATag)

        var buttonsDiv = document.createElement('div')
        var divP = document.createElement('p')
        buttonsDiv.appendChild(divP)

        var doneButton = document.createElement('button')
        doneButton.id = 'doneButton'
        doneButton.innerText = 'Done'
        doneButton.onclick = function () {
          newLi.style.textDecoration = 'line-through'
        }

        var displayRoute = document.createElement('button');
        displayRoute.id = 'suggestionsDisplayRouteButton'
        displayRoute.innerText = "Display Route"

        // var listScope = this;

        displayRoute.addEventListener('click', function(){
          console.log(suggestionsListScope)
          var mainMap = suggestionsListScope.page.map.mainMap;
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
    } else if (suggestionList.style.display === 'none') {
      suggestionList.style.display = 'inline-block'
    }
  }
}

module.exports = SuggestionList
