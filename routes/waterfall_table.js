var express = require('express');
var async = require("async");
var router = express.Router();
var waterfallData = require('../lib/waterfall_table_mysql');

const eventproxy = require("eventproxy");
var ep = new eventproxy();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('waterfall_table',{title:'ShareList'});
    //next();
});




router.post('/tableData', function(req, res, next){
    async.waterfall([
        function(callback){
            waterfallData.queryTableData(req.body.data,callback);
        }
    ], function(err,result){
        if(err){
            console.log('query tableData fail');
        }else{
            res.send(waterfallData.tableData);
        }
    })

});










module.exports = router;