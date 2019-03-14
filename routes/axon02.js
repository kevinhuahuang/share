var express = require('express');
var router = express.Router();

var app = require('../app');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('axon02',{title:'AUDIODAMAGE'});
    //next();
});

module.exports = router;
