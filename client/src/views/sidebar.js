var Sidebar = function(){
  this.sidebar = document.querySelector('#sidebar');
}

Sidebar.prototype = {

  populateList: function(getAllRoutes){
    var wishlistUL = document.querySelector('#wishlist')
    console.log(wishlistUL)
    
    var returnedList = getAllRoutes('http://localhost:3000/api/routes', function(){
      
      var parsedList = JSON.parse(this.response);
      parsedList.forEach(function(element){
        var newLi = document.createElement('li');
        newLi.innerText = element.route + " " + element.travelMode;

        var buttonsDiv = document.createElement('div')
        var divP = document.createElement('p')
        buttonsDiv.appendChild(divP)

        var doneButton = document.createElement('button');
        doneButton.id = "doneButton"
        doneButton.innerText = "Done"
        doneButton.onclick = function(){
          newLi.style.textDecoration = 'line-through';
        }

        var deleteButton = document.createElement('button');
        deleteButton.id = "deleteButton"
        deleteButton.innerText = "Delete"

        newLi.appendChild(divP)
        newLi.appendChild(doneButton);
        newLi.appendChild(deleteButton);
        wishlistUL.appendChild(newLi);
      })
    })
  }
}

module.exports = Sidebar;