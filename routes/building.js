const express = require('express')
const fs = require('fs')
const path = require('path')
const router = express.Router()

/* GET home page. */
router.get('/', function (req, res) {
  // res.render('main', {title: 'HomePage'}) // 使用模板
  let html = fs.readFileSync(path.resolve(__dirname, '../views/building.html'), 'utf-8')
  res.send(html)
})

module.exports = router
