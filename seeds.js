// WISHLIST ROUTES

use route_planner
db.dropDatabase()

// sample route to populate wishlist
db.routes.insert(

  { 'name' : 'Hebridean Way', 'rating' : null, "done": false,  'origin' : 'not needed', 'destination' : 'not needed', 'waypoints' : [ ], 'travelMode' : 'not needed', 'calculatedRoute' : {  }, 'googleResponse' : { 'origin' : { 'lat' : 56.93373668301624, 'lng' : -7.538337707519531 }, 'destination' : { 'lat' : 58.51360355740183, 'lng' : -6.26495361328125 }, 'travelMode' : 'BICYCLING', 'waypoints' : [ ] }, 'optimizeWaypoints' : true }

)

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
"rating" : null, "origin" : "not needed", 
"destination" : "not needed", 
"waypoints" : [ ], 
"travelMode" : "not needed", 
"calculatedRoute" : {  }, 
"googleResponse" : { 
  "origin" : { "lat" : 55.6198543500429, "lng" : -3.0608081817626953 }, 
  "destination" : { "lat" : 55.76266790754882, "lng" : -2.9693984985351562 }, 
  "travelMode" : "BICYCLING", 
  "waypoints" : [ { 
    "location" : { "lat" : 55.6983709, "lng" : -3.0416276999999354 }, 
    "stopover" : false }, { 
    "location" : { "lat" : 55.81247160321215, "lng" : -3.000469207763672 }, 
    "stopover" : false } ],  
  "optimizeWaypoints" : false  }, 
  "optimizeWaypoints" : true,
  "reviews" : [
  { "name": "Bob Stevens",
    "headline": "Walking isn't really for me.",
    "rating": 4,
    "reviewText": "Great to get some fresh air, fantastic dogging opportunities along route."},

    {"name": "Chris Evans",
    "headline": "The best walk ever",
    "rating": 3,
    "reviewText": "This is the best walk ever."}
    ] 
  }
)

db.routes.insert(

  { 'name' : 'Hebridean Way', 
  'rating' : null, 
  'origin' : 'not needed', 
  'destination' : 'not needed', 
  'waypoints' : [ ], 
  'travelMode' : 'not needed', 
  'calculatedRoute' : {  }, 
  'googleResponse' : { 
    'origin' : { 'lat' : 56.93373668301624, 'lng' : -7.538337707519531 }, 
    'destination' : { 'lat' : 58.51360355740183, 'lng' : -6.26495361328125 }, 
    'travelMode' : 'BICYCLING', 
    'waypoints' : [ ] }, 
  'optimizeWaypoints' : true,

  "reviews": [
  {
    "name": "Daniel Johnson",
    "headline": "Mother nature in all her terrifying glory",
    "rating": 0,
    "reviewText": "I hate nature." }  

  ]
  }
)

db.routes.insert(
{ "name" : "WalkHighlands- Calton Hill, Edinburgh", 
"rating" : null, 
"origin" : "1 Princes St, Edinburgh EH2 2AN, UK", 
"destination" : "2 Princes St, Edinburgh EH1 3YY, UK", 
"waypoints" : [ ], 
"travelMode" : "not needed", 
"calculatedRoute" : {  }, 
"googleResponse" : { 
  "origin" : { "lat" : 55.95322455399222, "lng" : -3.1896859779953957 }, 
  "destination" : { "lat" : 55.95333267531272, "lng" : -3.189149536192417 }, 
  "travelMode" : "WALKING", 
  "waypoints" : [ { "location" : { "lat" : 55.953682, "lng" : -3.187186399999973 }, 
  "stopover" : false }, { "location" : { "lat" : 55.95571520000001, "lng" : -3.1817086999999447 }, "stopover" : false }, { "location" : { "lat" : 55.9545544, "lng" : -3.1817135000000007 }, "stopover" : false }, { "location" : { "lat" : 55.9549485, "lng" : -3.1828365999999733 }, "stopover" : false }, { "location" : { "lat" : 55.95475023802656, "lng" : -3.1835031509399414 }, "stopover" : false } ],  
  "optimizeWaypoints" : false }, 
  "optimizeWaypoints" : true,
  "reviews" : [
  {
    "name": "Jacob Marley",
    "headline": "BEST WALK EVA!!!!!!",
    "rating": 5,
    "reviewText": "It was fine." }  

  ]
})

db.routes.insert(
  { "name" : "WalkHighlands - Port of Leith, Edinburgh", "rating" : null, "origin" : "Royal Yacht Britannia, Edinburgh EH6 6JH, UK", "destination" : "98 Ocean Dr, Edinburgh EH6 6JJ, UK", "waypoints" : [ ], "travelMode" : "not needed", "calculatedRoute" : {  }, "googleResponse" : { "origin" : { "lat" : 55.98204339999999, "lng" : -3.1767988999999943 }, "destination" : { "lat" : 55.9805114, "lng" : -3.1796624999999494 }, "travelMode" : "WALKING", "waypoints" : [ { "location" : { "lat" : 55.97856059999999, "lng" : -3.171438299999977 }, "stopover" : false }, { "location" : { "lat" : 55.97707029999999, "lng" : -3.169326100000035 }, "stopover" : false }, { "location" : { "lat" : 55.9752672, "lng" : -3.1721147000000656 }, "stopover" : false }, { "location" : { "lat" : 55.9768827, "lng" : -3.1702887999999803 }, "stopover" : false }, { "location" : { "lat" : 55.9770462937561, "lng" : -3.171770949212714 }, "stopover" : false }, { "location" : { "lat" : 55.9783444, "lng" : -3.179136699999958 }, "stopover" : false } ],  "optimizeWaypoints" : false }, "optimizeWaypoints" : true, 
  "reviews" : [
  {
    "name": "Jacob Marley",
    "headline": "BEST WALK EVA!!!!!!",
    "rating": 5,
    "reviewText": "It was fine." }  

  ]
})

db.routes.insert(
{ "name" : "WalkHighlands - Old Town, Edinburgh", "rating" : null, "origin" : "31 Waverley Bridge, Edinburgh EH1 1BQ, UK", "destination" : "31 Waverley Bridge, Edinburgh EH1 1BQ, UK", "waypoints" : [ ], "travelMode" : "not needed", "calculatedRoute" : {  }, "googleResponse" : { "origin" : { "lat" : 55.95231079600279, "lng" : -3.1920760650817783 }, "destination" : { "lat" : 55.95231151746669, "lng" : -3.1920070946216583 }, "travelMode" : "WALKING", "waypoints" : [ { "location" : { "lat" : 55.9500811, "lng" : -3.188236599999982 }, "stopover" : false }, { "location" : { "lat" : 55.9488838, "lng" : -3.195772300000044 }, "stopover" : false }, { "location" : { "lat" : 55.9474265, "lng" : -3.197989399999983 }, "stopover" : false }, { "location" : { "lat" : 55.9477878, "lng" : -3.193323200000009 }, "stopover" : false }, { "location" : { "lat" : 55.9483108, "lng" : -3.191358199999968 }, "stopover" : false }, { "location" : { "lat" : 55.94868049999999, "lng" : -3.1873218000000634 }, "stopover" : false }, { "location" : { "lat" : 55.950923, "lng" : -3.1843542000000298 }, "stopover" : false } ], "optimizeWaypoints" : false }, "optimizeWaypoints" : true, 
"reviews" : [
{
  "name": "Chris Langham",
  "headline": "Fine",
  "rating": 3,
  "reviewText": "It was fine." }  

]
})

db.routes.insert(
  { "name" : "WalkHighlands - New Town, Edinburgh", "rating" : null, "origin" : "2 Princes St, Edinburgh EH1 3YY, UK", "destination" : "10 Waterloo Pl, Edinburgh EH1, UK", "waypoints" : [ ], "travelMode" : "not needed", "calculatedRoute" : {  }, "googleResponse" : { "origin" : { "lat" : 55.95326059446592, "lng" : -3.189481794834137 }, "destination" : { "lat" : 55.95352489024806, "lng" : -3.1889668107032776 }, "travelMode" : "WALKING", "waypoints" : [ { "location" : { "lat" : 55.95557300462395, "lng" : -3.1986466197288337 }, "stopover" : false }, { "location" : { "lat" : 55.9564552, "lng" : -3.2047148000000334 }, "stopover" : false }, { "location" : { "lat" : 55.9553284, "lng" : -3.2092135000000326 }, "stopover" : false }, { "location" : { "lat" : 55.950309, "lng" : -3.205195099999969 }, "stopover" : false } ], "optimizeWaypoints" : false }, "optimizeWaypoints" : true,
  "reviews" : [
  {
    "name": "Phil Mitchell",
    "headline": "Not enough pubs",
    "rating": 2,
    "reviewText": "Not a single pub for miles." }  
    ]
  })

db.routes.insert(
  { "name" : "WalkHighlands - Water of Leith, Slateford to Leith", "rating" : null, "origin" : "30 Lanark Rd, Edinburgh EH14, UK", "destination" : "35 Ocean Dr, Edinburgh EH6 6JJ, UK", "waypoints" : [ ], "travelMode" : "not needed", "calculatedRoute" : {  }, "googleResponse" : { "origin" : { "lat" : 55.923275343014815, "lng" : -3.2479043304920197 }, "destination" : { "lat" : 55.978533887907055, "lng" : -3.1691208640014565 }, "travelMode" : "WALKING", "waypoints" : [ { "location" : { "lat" : 55.925587, "lng" : -3.258277899999939 }, "stopover" : false }, { "location" : { "lat" : 55.9391213, "lng" : -3.2454553000000033 }, "stopover" : false }, { "location" : { "lat" : 55.9452167, "lng" : -3.240776500000038 }, "stopover" : false }, { "location" : { "lat" : 55.94906630000001, "lng" : -3.224507600000038 }, "stopover" : false }, { "location" : { "lat" : 55.9505444, "lng" : -3.22195320000003 }, "stopover" : false }, { "location" : { "lat" : 55.9523024, "lng" : -3.2196860000000243 }, "stopover" : false }, { "location" : { "lat" : 55.9518469, "lng" : -3.2168656000000055 }, "stopover" : false }, { "location" : { "lat" : 55.9617138, "lng" : -3.211925899999983 }, "stopover" : false }, { "location" : { "lat" : 55.9622703, "lng" : -3.201778300000001 }, "stopover" : false }, { "location" : { "lat" : 55.9650416, "lng" : -3.199672400000054 }, "stopover" : false }, { "location" : { "lat" : 55.9754456, "lng" : -3.172674700000016 }, "stopover" : false } ],  "optimizeWaypoints" : false }, "optimizeWaypoints" : true, 
  "reviews" : [
  {
    "name": "Dave",
    "headline": "No toilets",
    "rating": 5,
    "reviewText": "No toilets." }  

  ]
  })
