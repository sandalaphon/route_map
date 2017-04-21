var Route = function(url){
  this.url = url;
  this.directions = []
  
}

Route.prototype = {
  getData: function(callback){
    var request = new XMLHttpRequest();
    request.open("GET", this.url);
    request.onload = function(){
      if(request.status === 200){
        var jsonString = request.responseText;
        this.directions = JSON.parse(jsonString);
        console.log(this.directions)
        callback(this.directions)
      }
    }.bind(this);
    request.send();
  }

}

module.exports = Route;