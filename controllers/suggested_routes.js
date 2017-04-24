var express = require('express')
var suggestedListRouter = express.Router()
var RoutePlannerQuery = require('../db/route_planner_query.js')  // TODO rationalise filename to match constructor
var suggestedListQuery = new RoutePlannerQuery('routes', 'suggested_routes')

// INDEX
suggestedListRouter.get('/', function (req, res) {
  suggestedListQuery.all(function (docs) {
    res.json(docs)
  })
})

// SHOW
suggestedListRouter.get('/:id', function (req, res) {
  suggestedListQuery.find(req.params.id, function (doc) {
    res.json(doc)
  })
})

// // CREATE
// suggestedListRouter.post('/', function (req, res) {
//   var newRoute = req.body
//   suggestedListQuery.add(newRoute, function (docs) {
//     res.json(docs)
//   })
// })

// // DELETE
// suggestedListRouter.delete('/:id', function (req, res) {
//   suggestedListQuery.delete(req.params.id, function (docs) {
//     res.json(docs)
//   })
// })

// // UPDATE
// suggestedListRouter.put('/:id', function (req, res) {
//   suggestedListQuery.update(req.params.id, req.body, function (docs) {
//     res.json(docs)
//   })
// })

module.exports = suggestedListRouter
