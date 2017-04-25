/* eslint-env mocha */
var Route = require('../route.js')
var assert = require('assert')

describe('Route', function () {
  var route1
  var googleResponseObject =
    {
      'origin':
      {
        'lat': 55.34164183013326,
        'lng': -3.2958984375
      },
      'destination':
      {
        'lat': 53.72271667491848,
        'lng': -1.16455078125
      },
      'travelMode': 'BICYCLING',
      'waypoints':
      [
        { 'location':
        {
          'lat': 54.924616610211885,
          'lng': -1.61279296875
        },
          'stopover': false
        }
      ],
      'Gb': 1,
      'optimizeWaypoints': false,
      'af': 3,
      'ie': 7
    }

  beforeEach(function () {
    route1 = new Route({lat: 59.5, lng: -3.2}, {lat: 51.5, lng: 0.1}, 'CYCLING')
    route1.addName('Edinburgh to London')
  })

  it('Route has name, initially null', function () {
    var newRoute = new Route({lat: 59.5, lng: -3.2}, {lat: 51.5, lng: 0.1})
    assert.strictEqual(null, newRoute.name)
    assert.strictEqual('Edinburgh to London', route1.name)
  })

  it('Route starts in Edinburgh', function () {
    assert.deepEqual({lat: 59.5, lng: -3.2}, route1.origin)
  })

  it('Route ends in London', function () {
    assert.deepEqual({ lat: 51.5, lng: 0.1 }, route1.destination)
  })

  it('Route has travel method', function () {
    assert.strictEqual('CYCLING', route1.travelMode)
  })

  it('Routes start not done', function(){
    assert.strictEqual(false, route1.done)
  })

  // it('can save', function () {                  // Can't test save as it uses XMLHttpRequest which is browser, not node.
  //   assert.strictEqual('saved', route1.save())
  // })

  it('has a googleresponse, initially null, can be set', function () {
    assert.strictEqual(null, route1.googleResponse)
    route1.googleresponse = googleResponseObject
    assert.deepEqual(googleResponseObject, route1.googleresponse)
  })
})
