var MapWrapper = require('../mapWrapper.js')

var Page = function () {
  this.page = document
  this.route = null
  this.buttons = {
    start: document.querySelector('#start'),
    end: document.querySelector('#finish'),
    route: document.querySelector('#route'),
    cycling: document.querySelector('#cycling'),
    walking: document.querySelector('#walking'),
    save: document.querySelector('#save')
  }
  var containerDiv = document.querySelector('#main-map')
  this.map = {
    center: {lat: 55.953251, lng: -3.188267},
    containerDiv: containerDiv,
    mainMap: new MapWrapper(containerDiv, {lat: 55.953251, lng: -3.188267}, 5),
    transportMethod: 'BICYCLING'
  }

}

Page.prototype = {

  setupButtons: function () {
    this.setButtonEvent('click', this.buttons['start'], this.map.mainMap.addStartClickEvent.bind(this.map.mainMap))
    this.setButtonEvent('click', this.buttons['end'], this.map.mainMap.addFinishClickEvent.bind(this.map.mainMap))
    this.setButtonEvent('click', this.buttons['cycling'], function () {
      this.map.transportMethod = 'BICYCLING'
    }.bind(this))
    this.setButtonEvent('click', this.buttons['walking'], function () {
      this.map.transportMethod = 'WALKING'
    }.bind(this))
    this.setButtonEvent('click', this.buttons['route'], this.map.mainMap.calculateRoute.bind(this.map))
    this.setButtonEvent('click', this.buttons['save'], this.map.mainMap.saveRoute.bind(this.map))
  },

  setButtonEvent: function (type, button, callback) {
    button.addEventListener(type, callback)
    // console.log(type, button, callback)
  }

}

module.exports = Page