var express = require('express')
var fs = require('fs')
var path = require('path')
var router = express.Router()
const jsonData = require('../public/json/kind/life.json')
const PUBLIC = require('./public')

// var app = require('../app')

/* GET home page. */
router.get('/', function (req, res) {
  // res.render('main', {title: 'HomePage'}) // 使用模板
  let html = fs.readFileSync(path.resolve(__dirname, PUBLIC.htmlPathSwitch + 'life.html'), 'utf-8')
  res.send(html)
})

router.get('/jsonData', (req, res) => {
  res.send(jsonData)
})

module.exports = router
