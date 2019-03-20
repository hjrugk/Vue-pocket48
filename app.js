const express = require('express')
const bodyParser = require('body-parser')
const router = require('./bin/router/router');
const path = require('path')

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}))

// parse application/json
app.use(bodyParser.json())

app.use(router);

app.use('/',express.static(path.join(__dirname, 'public'),{index: 'index.html'}))

app.listen(3000, () => {
  console.log('Server is running')
})