var express = require('express');
var router = express.Router();

var app = require('../app');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('guide',{title:'HomePage'});
    //next();
});

module.exports = router;
