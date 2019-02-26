const express = require('express')
const bodyParser = require('body-parser')
const router = require('./app/router/router');

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}))

// parse application/json
app.use(bodyParser.json())

app.use(router);

app.listen(3000, () => {
  console.log('Server is running')
})