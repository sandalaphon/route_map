// WISHLIST ROUTES

use route_planner
db.dropDatabase()

db.routes.insert(
  { 'name' : 'Hebridean Way', 
  'rating' : null, 
  'origin' : 'not needed', 
  'destination' : 'not needed', 
  'waypoints' : [ ], 
  'travelMode' : 'not needed', 
  'calculatedRoute' : {  }, 
  'googleResponse' : { 'origin' : { 'lat' : 56.93373668301624, 'lng' : -7.538337707519531 }, 
  'destination' : { 'lat' : 58.51360355740183, 'lng' : -6.26495361328125 }, 
  'travelMode' : 'BICYCLING', 'waypoints' : [ ] }, 
  'optimizeWaypoints' : true }
)

// SUGGESTED ROUTES

use suggested_routes
db.dropDatabase()
db.routes.insert(
  { "name" : "Innerleithen to Heriot - default", 
  "rating" : null, 
  "origin" : "not needed", 
  "destination" : "not needed", 
  "waypoints" : [ ], 
  "travelMode" : "not needed", 
  "calculatedRoute" : {  }, 
  "googleResponse" : { "origin" : { "lat" : 55.6198543500429, "lng" : -3.0608081817626953 }, 
  "destination" : { "lat" : 55.76266790754882, "lng" : -2.9693984985351562 }, 
  "travelMode" : "BICYCLING", "waypoints" : [ ] }, 
  "optimizeWaypoints" : true,

  "reviews": [{
    "name": "Steve Jenkins",
    "headline": "An average walk",
    "rating": 3,
    "reviewText": "A steep climb, not many stop-offs along the way."
  }]
})

db.routes.insert(
  {  "name" : "Innerleithen to Heriot - modified", 
  "rating" : null, 
  "origin" : "not needed", 
  "destination" : "not needed", 
  "waypoints" : [ ], 
  "travelMode" : "not needed", 
  "calculatedRoute" : {  }, 
  "googleResponse" : { "origin" : { "lat" : 55.6198543500429, "lng" : -3.0608081817626953 }, 
  "destination" : { "lat" : 55.76266790754882, "lng" : -2.9693984985351562 }, 
  "travelMode" : "BICYCLING", 
  "waypoints" : [ { "location" : { "lat" : 55.6983709, "lng" : -3.0416276999999354 }, 
  "stopover" : false }, { "location" : { "lat" : 55.81247160321215, "lng" : -3.000469207763672 }, 
  "stopover" : false } ], 
  "Gb" : 2, 
  "optimizeWaypoints" : false, 
  "af" : 3, "ie" : 12 }, 
  "optimizeWaypoints" : true,

  "reviews": [{
    "name": "Bob Stevens",
    "headline": "Dogging",
    "rating": 4,
    "reviewText": "Great to get some fresh air, fantastic dogging opportunities along route."},

    {"name": "Chris Evans",
    "headline": "The best walk ever",
    "rating": 3,
    "reviewText": "This is the best walk ever."}
    ] }
)

db.routes.insert(
  { 'name' : 'Hebridean Way', 
  'rating' : null, 
  'origin' : 'not needed', 
  'destination' : 'not needed', 
  'waypoints' : [ ], 
  'travelMode' : 'not needed', 
  'calculatedRoute' : {  }, 
  'googleResponse' : { 'origin' : { 'lat' : 56.93373668301624, 'lng' : -7.538337707519531 }, 
  'destination' : { 'lat' : 58.51360355740183, 'lng' : -6.26495361328125 }, 
  'travelMode' : 'BICYCLING', 'waypoints' : [ ] }, 
  'optimizeWaypoints' : true,

  "reviews": [
  {
    "name": "Daniel Johnson",
    "headline": "Mother nature in all her terrifying glory",
    "rating": 0,
    "reviewText": "I hate nature." }  

  ]
})