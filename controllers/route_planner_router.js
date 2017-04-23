var express = require('express')
var routePlannerRouter = express.Router()
var RoutesQuery = require('../db/route_planner_query.js')  // TODO - rationalise name of file to match object constructor
var routesQuery = new RoutesQuery('routes')

// INDEX
routePlannerRouter.get('/', function (req, res) {
  routesQuery.all(function (docs) {
    res.json(docs)
  })
})

// SHOW
routePlannerRouter.get('/:id', function (req, res) {
  routesQuery.find(req.params.id, function (doc) {
    console.log(doc)
    res.json(doc)
  })
})

// SHOW/byname
routePlannerRouter.get('/name/:id', function (req, res) {
  routesQuery.findRouteByName(req.params.id, function (doc) {
    res.json(doc)
  })
})

// CREATE
routePlannerRouter.post('/', function (req, res) {
  var newRoute = req.body
  routesQuery.add(newRoute, function (docs) {
    res.json(docs)
  })
})

// DELETE
routePlannerRouter.delete('/:id', function (req, res) {
  routesQuery.delete(req.params.id, function (docs) {
    res.json(docs)
  })
})

// UPDATE
routePlannerRouter.put('/:id', function (req, res) {
  routesQuery.update(req.params.id, req.body, function (docs) {
    res.json(docs)
  })
})

module.exports = routePlannerRouter
