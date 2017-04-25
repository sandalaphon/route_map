var MongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID

var ReviewQuery = function (collectionName, dbName) {
  this.url = 'mongodb://localhost:27017/' + dbName
  this.collection = collectionName
}

ReviewQuery.prototype = {

  all: function (onQueryFinished) {
    MongoClient.connect(this.url, function (err, db) {
      if (db) {
        var collection = db.collection(this.collection)
        collection.find().toArray(function (err, docs) {
          onQueryFinished(docs)
        })
      }
    }.bind(this))
  }

}

module.exports = ReviewQuery;