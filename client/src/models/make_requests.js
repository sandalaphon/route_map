var MakeRequest = function () {
}

MakeRequest.prototype = {


  makeGetRequest: function (url, callback) {
    var request = new XMLHttpRequest()
    request.open('GET', url)
    request.onload = callback
    console.log(request)
    request.send()
  },

  makePostRequest: function (url, callback, payload) {
    // post XMLHTTP reauest
    console.log('XMLHttpRequest...')
    var request = new XMLHttpRequest()
    request.open('POST', url)
    request.setRequestHeader('Content-Type', 'application/json')
    request.onload = callback
    request.send(payload)
  }

  // requestComplete: function () {
  //   if (this.status !== 200) return
  //   var jsonString = this.responseText
  //   countries = JSON.parse(jsonString)
  // }
}
module.exports = MakeRequest
