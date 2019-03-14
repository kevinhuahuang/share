var express = require('express');
var router = express.Router();

var app = require('../app');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('resume',{title:'简历'});
    //next();
});

module.exports = router;
