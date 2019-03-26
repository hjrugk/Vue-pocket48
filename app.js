const express = require('express')
const bodyParser = require('body-parser')
const router = require('./bin/router/router');
const path = require('path')
const childProcess = require('child_process')

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}))

// parse application/json
app.use(bodyParser.json())

app.use(router)

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
})

app.use('/',express.static(path.join(__dirname, 'dist'),{index: 'index.html'}))

app.listen(3000, () => {
  console.log('Your App is running at http://localhost:3000')
  childProcess.exec(`start http://localhost:3000`)
})