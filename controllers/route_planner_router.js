var express = require('express');
var routePlannerRouter = express.Router();

routePlannerRouter.get('/', function(req, res){
  res.json({ data: [{name: "Earth"}]});

})

module.exports = routePlannerRouter;