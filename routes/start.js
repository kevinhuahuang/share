var express = require('express');
var async = require("async");
var router = express.Router();
var shareData = require('../lib/calculate_share_data/index');
var kLineData = require('../lib/query_k_line_data');

var app = require('../app');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('start',{title:'ShareList'});
    //next();
});


module.exports = router;
































