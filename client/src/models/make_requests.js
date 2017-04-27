var MakeRequest = function () {
}

MakeRequest.prototype = {

  makeGetRequest: function (url, callback) {
    var request = new XMLHttpRequest()
    request.open('GET', url)
    request.onload = callback
    request.send()
  },

  makePostRequest: function (url, callback, payload) {
    // post XMLHTTP reauest
    var request = new XMLHttpRequest()
    request.open('POST', url)
    request.setRequestHeader('Content-Type', 'application/json')
    request.onload = callback
    request.send(payload)
  },

  makePutRequest: function (url, callback, objectToUpdate) {
    var request = new XMLHttpRequest()
    var jsonString = JSON.stringify(objectToUpdate)
    request.open('PUT', url)
    request.setRequestHeader('Content-Type', 'application/json')
    request.onload = callback(request)
    request.send(jsonString)
  }

  // requestComplete: function () {
  //   if (this.status !== 200) return
  //   var jsonString = this.responseText
  //   result = JSON.parse(jsonString)
  // }
}
module.exports = MakeRequest
