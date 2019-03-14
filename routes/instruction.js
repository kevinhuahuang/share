var express = require('express');
var router = express.Router();

var app = require('../app');

router.get('/', function(req, res, next) {
    res.render('instruction',{title:'操作说明'});
    //next();
});

module.exports = router;
