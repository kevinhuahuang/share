var express = require('express');
var router = express.Router();

var app = require('../app');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('home',{title:'HomePage'});
    //next();
});

module.exports = router;
