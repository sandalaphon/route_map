var express = require('express')
var app = express()
var bodyParser = require('body-parser')

app.use(bodyParser.json({limit: '16mb'}));
app.use(bodyParser.urlencoded({extended: true}))


app.use(require('./controllers/index.js'))

app.use(express.static('client/build'))

app.listen(3000, function () {
  console.log('listening on port 3000')
})
