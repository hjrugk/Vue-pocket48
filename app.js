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

app.use('/',express.static(path.join(__dirname, 'dist'),{index: 'index.html'}))

app.listen(3000, () => {
  console.log('Your App is running at http://localhost:3000')
  childProcess.exec(`start http://localhost:3000`)
})