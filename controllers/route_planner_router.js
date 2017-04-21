var express = require('express');
var routePlannerRouter = express.Router();
var RoutePlannerQuery = require('../db/route_planner_query.js');
var routePlannerQuery = new RoutePlannerQuery();


//INDEX
routePlannerRouter.get('/', function(req, res){
  routePlannerQuery.all(function(docs){
    res.json(docs);
  })
 

})

//SHOW


//CREATE
routePlannerRouter.post('/', function(req, res){
  routePlannerQuery.add(route)
})


//DELETE



//UPDATE


module.exports = routePlannerRouter;