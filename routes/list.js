var express = require('express')
var fs = require('fs')
var path = require('path')
var router = express.Router()
const listData = require('../public/json/list/list.json')
const PUBLIC = require('./public')
// var app = require('../app')

/* GET home page. */
router.get('/', function (req, res) {
  // res.render('main', {title: 'HomePage'}) // 使用模板
  let html = fs.readFileSync(path.resolve(__dirname, PUBLIC.htmlPathSwitch + 'list.html'), 'utf-8')
  console.log('list.html')
  res.send(html)
})

router.get('/listPageData', (req, res) => {
  // res.render('main', {title: 'HomePage'}) // 使用模板
  console.log('listPageData')
  res.send(listData)
})

module.exports = router
