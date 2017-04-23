var Sidebar = function(){
  this.sidebarHTMLObject = document.querySelector('#sidebar');
  sidebarHidden = false;
}

Sidebar.prototype = {

  populateList: function(getAllRoutes){
    var wishlistUL = document.querySelector('#wishlist')
    console.log(wishlistUL)
    
    var returnedList = getAllRoutes('http://localhost:3000/api/routes', function(){
      
      var parsedList = JSON.parse(this.response);
      parsedList.forEach(function(element){
        var newLi = document.createElement('li');
        console.log("ELEMENT",element)
        newLi.innerText = "Name of Route:\n" + element.name + " \n" + element.googleResponse.travelMode;

        var newBr = document.createElement('br');
        newLi.appendChild(newBr)

        var newATag = document.createElement('a');
        var hrefString = "http://localhost:3000/api/routes/"+element.name
        newATag.href = hrefString;
        newATag.text = "Map Link Here";
        newLi.appendChild(newATag);

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

        var listBr = document.createElement('br')
        wishlistUL.appendChild(listBr)
      })
    })
  },

  revealWishlist: function(){
    var sidebar = document.querySelector('#sidebar');    
    if (sidebar.style.display === 'inline-block'){
      sidebar.style.display = 'none';  
    }
    else if (sidebar.style.display === 'none'){
      sidebar.style.display = 'inline-block';  
    }
  }
}

module.exports = Sidebar;