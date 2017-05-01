var express = require('express')
var router = express.Router()
var path = require('path')

//hello
router.use('/api/suggested_routes', require('./suggested_routes.js'))


router.use('/api/routes', require('./route_planner_router.js'))

router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/../client/index.html'))
})

module.exports = router
