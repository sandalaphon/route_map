var Route = require('../route.js')
var assert = require('assert')

describe('Route', function () {
  var route1

  beforeEach(function () {
    route1 = new Route({lat: 59.5, lng: -3.2}, {lat: 51.5, lng: 0.1}, 'CYCLING', 'Edinburgh to London')
  })

  it('Route has name', function () {
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
})
