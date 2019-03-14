var express = require('express')
var fs = require('fs')
var path = require('path')
var router = express.Router()
const contentData = require('../public/json/main/content.json')
const flashBuyData = require('../public/json/main/flashBuy.json')
const homeData = require('../public/json/main/homeChannel.json')
const miData = require('../public/json/main/mi.json')
const navHeaderData = require('../public/json/main/navHeader.json')
const navLeftData = require('../public/json/main/navLeft.json')
const navRightData = require('../public/json/main/navRight.json')
const recommendData = require('../public/json/main/recommend.json')
const sliderData = require('../public/json/main/slider.json')
const topBarData = require('../public/json/main/topBar.json')
const PUBLIC = require('./public')

// var app = require('../app')

/* GET home page. */
router.get('/', function (req, res) {
  // res.render('main', {title: 'HomePage'}) // 使用模板
  let html = fs.readFileSync(path.resolve(__dirname, PUBLIC.htmlPathSwitch + 'main.html'), 'utf-8')
  res.send(html)
})

router.get('/contentData', function (req, res) {
  // res.render('main', {title: 'HomePage'}) // 使用模板
  res.send(contentData)
})

router.get('/flashBuyData', function (req, res) {
  // res.render('main', {title: 'HomePage'}) // 使用模板
  res.send(flashBuyData)
})

router.get('/homeData', function (req, res) {
  // res.render('main', {title: 'HomePage'}) // 使用模板
  res.send(homeData)
})

router.get('/miData', function (req, res) {
  // res.render('main', {title: 'HomePage'}) // 使用模板
  res.send(miData)
})

router.get('/navHeaderData', function (req, res) {
  // res.render('main', {title: 'HomePage'}) // 使用模板
  res.send(navHeaderData)
})

router.get('/navLeftData', function (req, res) {
  // res.render('main', {title: 'HomePage'}) // 使用模板
  res.send(navLeftData)
})

router.get('/navRightData', function (req, res) {
  // res.render('main', {title: 'HomePage'}) // 使用模板
  res.send(navRightData)
})

router.get('/recommendData', function (req, res) {
  // res.render('main', {title: 'HomePage'}) // 使用模板
  res.send(recommendData)
})

router.get('/sliderData', function (req, res) {
  // res.render('main', {title: 'HomePage'}) // 使用模板
  res.send(sliderData)
})

router.get('/topBarData', function (req, res) {
  // res.render('main', {title: 'HomePage'}) // 使用模板
  res.send(topBarData)
})

module.exports = router
