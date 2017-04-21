var MongoClient = require('mongodb').MongoClient;

var RoutesQuery = function(){
  this.url = "mongodb://localhost:27017/route_planner";
};

RoutesQuery.prototype = {
  all: function(onQueryFinished){
    MongoClient.connect(this.url,function(err, db){
      if(db){
        var collection = db.collection("routes");
        collection.find().toArray(function(err, docs){
          onQueryFinished(docs);
        })
      }
    })
  },
  add: function(routeToAdd, onQueryFinished){
    MongoClient.connect(this.url, function(err, db){
      if(db){
        var collection = db.collection("routes");
        collection.insert(routeToAdd);
        collection.find().toArray(function(err,docs){
          onQueryFinished(docs);
        })
      }

    })
  }

}

module.exports = RoutesQuery;