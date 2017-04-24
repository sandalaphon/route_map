use route_planner
db.dropDatabase()
// db.routes.insert({route: "the way home"})
// db.wishlist.insert({name: "London to Edinburgh"})

db.routes.insert(
  { 'name' : 'Hebridean Way', 'rating' : null, 'origin' : 'not needed', 'destination' : 'not needed', 'waypoints' : [ ], 'travelMode' : 'not needed', 'calculatedRoute' : {  }, 'googleResponse' : { 'origin' : { 'lat' : 56.93373668301624, 'lng' : -7.538337707519531 }, 'destination' : { 'lat' : 58.51360355740183, 'lng' : -6.26495361328125 }, 'travelMode' : 'BICYCLING', 'waypoints' : [ ] }, 'optimizeWaypoints' : true }
)




use suggested_routes
db.dropDatabase()
db.routes.insert(
  { "name" : "Innerleithen to Heriot - default", "rating" : null, "origin" : "not needed", "destination" : "not needed", "waypoints" : [ ], "travelMode" : "not needed", "calculatedRoute" : {  }, "googleResponse" : { "origin" : { "lat" : 55.6198543500429, "lng" : -3.0608081817626953 }, "destination" : { "lat" : 55.76266790754882, "lng" : -2.9693984985351562 }, "travelMode" : "BICYCLING", "waypoints" : [ ] }, "optimizeWaypoints" : true }
  )
db.routes.insert(
{  "name" : "Innerleithen to Heriot - modified", "rating" : null, "origin" : "not needed", "destination" : "not needed", "waypoints" : [ ], "travelMode" : "not needed", "calculatedRoute" : {  }, "googleResponse" : { "origin" : { "lat" : 55.6198543500429, "lng" : -3.0608081817626953 }, "destination" : { "lat" : 55.76266790754882, "lng" : -2.9693984985351562 }, "travelMode" : "BICYCLING", "waypoints" : [ { "location" : { "lat" : 55.6983709, "lng" : -3.0416276999999354 }, "stopover" : false }, { "location" : { "lat" : 55.81247160321215, "lng" : -3.000469207763672 }, "stopover" : false } ], "Gb" : 2, "optimizeWaypoints" : false, "af" : 3, "ie" : 12 }, "optimizeWaypoints" : true }
)
db.routes.insert(
  { 'name' : 'Hebridean Way', 'rating' : null, 'origin' : 'not needed', 'destination' : 'not needed', 'waypoints' : [ ], 'travelMode' : 'not needed', 'calculatedRoute' : {  }, 'googleResponse' : { 'origin' : { 'lat' : 56.93373668301624, 'lng' : -7.538337707519531 }, 'destination' : { 'lat' : 58.51360355740183, 'lng' : -6.26495361328125 }, 'travelMode' : 'BICYCLING', 'waypoints' : [ ] }, 'optimizeWaypoints' : true }
)

