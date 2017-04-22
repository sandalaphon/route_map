var express = require('express');
var wishListRouter = express.Router();
var RoutePlannerQuery = require('../db/route_planner_query.js');  // TODO rationalise filename to match constructor
var wishListQuery = new RoutePlannerQuery("wishlist");

// INDEX
wishListRouter.get('/', function(req, res){
  wishListQuery.all(function(docs){
    res.json(docs);
  })
})

// SHOW
wishListRouter.get('/:id', function(req, res){
  wishListQuery.find( req.params.id, function(doc){
    res.json(doc);
  })
})

// CREATE
wishListRouter.post('/', function(req, res){
  var newRoute = req.body
  wishListQuery.add(newRoute, function(docs){
    res.json(docs);
  })
})

// DELETE
wishListRouter.delete('/:id', function(req, res){
  wishListQuery.delete(req.params.id, function(docs){
    res.json(docs)
  })
})

// UPDATE
wishListRouter.put('/:id', function(req, res ){
  wishListQuery.update(req.params.id, req.body, function(docs){
    res.json(docs)
  })
})

module.exports = wishListRouter;
