var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

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
  },
  find: function(routeID, onQueryFinished){
    MongoClient.connect(this.url, function(err, db){
      if(db){
        var collection = db.collection("routes");
        collection.find({_id: ObjectID(routeID)}).toArray(function(err, docs){
          onQueryFinished(docs)
        })
      }
    })  
  },
  delete: function(routeID, onQueryFinished){
    MongoClient.connect(this.url, function(err, db){
      if(db){
        var collection = db.collection("routes");
        collection.remove({_id: ObjectID(routeID)});
        collection.find().toArray(function(err, docs){
          onQueryFinished(docs);
        })
        
      }
    })
  },
  update: function(routeID, payload, onQueryFinished){
    MongoClient.connect(this.url, function(err, db){
      if(db){
        var collection = db.collection("routes");
        collection.updateOne({_id: ObjectID(routeID)}, {$set: payload}, function(err, docs){
          onQueryFinished(docs);
        });

      }
    })
  }  

}

module.exports = RoutesQuery;