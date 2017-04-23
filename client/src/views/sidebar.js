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

        var doneButton = document.createElement('button');
        doneButton.id = "doneButton"
        doneButton.innerText = "Done"
        doneButton.onclick = function(){
          console.log(newLi)
          newLi.style.textDecoration = 'line-through';
        }

        newLi.appendChild(doneButton);
        wishlistUL.appendChild(newLi);
      })
    })
  }
}

module.exports = Sidebar;