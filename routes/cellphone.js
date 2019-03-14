const express = require('express')
const fs = require('fs')
const path = require('path')
const router = express.Router()
const jsonData = require('../public/json/kind/cellphone.json')
const PUBLIC = require('./public')
// var app = require('../app')

/* GET home page. */
router.get('/', function (req, res) {
  // res.render('main', {title: 'HomePage'}) // 使用模板
  let html = fs.readFileSync(path.resolve(__dirname, PUBLIC.htmlPathSwitch + 'cellphone.html'), 'utf-8')
  res.send(html)
})

router.get('/jsonData', (req, res) => {
  res.send(jsonData)
})

module.exports = router
