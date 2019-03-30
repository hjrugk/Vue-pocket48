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
  console.log('正在为您启动应用···')
  childProcess.exec(`start http://localhost:3000`)
  console.log('应用已启动:http://localhost:3000')
})