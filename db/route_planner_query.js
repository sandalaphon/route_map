var MongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID

var RoutesQuery = function (collectionName) {
  this.url = 'mongodb://localhost:27017/route_planner'
  this.collection = collectionName
}

RoutesQuery.prototype = {

  all: function(onQueryFinished){
    MongoClient.connect(this.url,function(err, db){
      if(db){
        var collection = db.collection(this.collection);
        collection.find().toArray(function(err, docs){
          onQueryFinished(docs);
        })
      }
    }.bind(this))
  },

  add: function(routeToAdd, onQueryFinished){
    MongoClient.connect(this.url, function(err, db){
      if(db){
        var collection = db.collection(this.collection);
        collection.insert(routeToAdd);
        collection.find().toArray(function(err,docs){
          onQueryFinished(docs);
        })
      }
    }.bind(this))
  },

    find: function(routeID, onQueryFinished){
      MongoClient.connect(this.url, function(err, db){
        if(db){
          var regex = /[0-9a-f]{24}/g;
          var collection = db.collection(this.collection);
          // if 24 character hex
          if(regex.test(routeID))
  //           
          {
          collection.find({_id: ObjectID(routeID)}).toArray(function(err, docs){
            onQueryFinished(docs)
          })
          //else try name
        }else{
          collection.find({name: routeID}).toArray(function(err, docs){
            onQueryFinished(docs)

          })
        }
      }
    }.bind(this))
  },
 

  delete: function(routeID, onQueryFinished){
    MongoClient.connect(this.url, function(err, db){
      if(db){
        var collection = db.collection(this.collection);
        collection.remove({_id: ObjectID(routeID)});
        collection.find().toArray(function(err, docs){
          onQueryFinished(docs);
        })
      }
    }.bind(this))
  },

  update: function(routeID, payload, onQueryFinished){
    MongoClient.connect(this.url, function(err, db){
      if(db){
        var collection = db.collection(this.collection);
        collection.updateOne({_id: ObjectID(routeID)}, {$set: payload}, function(err, docs){
          onQueryFinished(docs);
        });
      }
    }.bind(this))
  }

}

module.exports = RoutesQuery
