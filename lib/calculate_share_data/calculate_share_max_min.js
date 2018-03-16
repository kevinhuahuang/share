const async = require("async"),
    fs = require("fs"),
    mysql = require("mysql"),
    superagent = require("superagent"),
    cheerio = require("cheerio"),
    eventproxy = require("eventproxy");

var ep = new eventproxy();

var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'AGR670A4',
    port: '3306',
    database : 'share_max_min'
});


var connection163 = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'AGR670A4',
    port : '3306',
    database : 'share_daily_163'
});


var connectionData = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'AGR670A4',
    port : '3306',
    database : 'share_data'
});


var sqlSentence;


var minRateBottom800 = [];
function getCloseMinRateBottom800(callback){

    sqlSentence = 'SELECT name, code, min_rate FROM share_close_max_min ORDER BY min_rate ASC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT CloseMinRateBottom50 ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        var i;
        minRateBottom800.length = 0;
        var name, code, rate;
        for(i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].min_rate;
            minRateBottom800.push([code,name, rate]);  //code ahead, sort by the first word
            if(i === result.length-1){
                //console.log(minRateBottom800);
                callback(null);
            }
        }

    });
}

var minYearRateBottom800 = [];
function getCloseMinYearRateBottom800(callback){

    sqlSentence = 'SELECT name, code, min_year_rate FROM share_close_max_min ORDER BY min_year_rate ASC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT CloseMinRateBottom50 ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        var i;
        minYearRateBottom800.length = 0;
        var name, code, rate;
        for(i=0; i< result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].min_year_rate;
            minYearRateBottom800.push([code, name, rate]); //code ahead, sort by the first word
            if(i === result.length-1){
                //console.log(minYearRateBottom800);
                callback(null);
            }
        }

    });

}

var maxRateBottom800 = [];
function getCloseMaxRateBottom800(callback){

    sqlSentence = 'SELECT name, code, max_rate FROM share_close_max_min ORDER BY max_rate ASC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT CloseMaxRateBottom50 ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        var i;
        maxRateBottom800.length = 0;
        var name, code, rate;
        for(i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].max_rate;
            maxRateBottom800.push([code,name, rate]);  //code ahead, sort by the first word
            if(i === result.length-1){
                //console.log(maxRateBottom800);
                callback(null);
            }
        }

    });
}

var maxYearRateBottom800 = [];
function getCloseMaxYearRateBottom800(callback){

    sqlSentence = 'SELECT name, code, max_year_rate FROM share_close_max_min ORDER BY max_year_rate ASC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT CloseMaxRateBottom50 ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        var i;
        maxYearRateBottom800.length = 0;
        var name, code, rate;
        for(i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].max_year_rate;
            maxYearRateBottom800.push([code,name, rate]);  //code ahead, sort by the first word
            if(i === result.length-1){
                //console.log(maxYearRateBottom800);
                callback(null);
            }
        }

    });
}


var averageRateBottom800 = [];
function getCloseAverageRateBottom800(callback){

    sqlSentence = 'SELECT name, code, average_rate FROM share_close_max_min ORDER BY average_rate ASC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT CloseaverageRateBottom50 ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        var i;
        averageRateBottom800.length = 0;
        var name, code, rate;
        for(i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].average_rate;
            averageRateBottom800.push([code,name, rate]);  //code ahead, sort by the first word
            if(i === result.length-1){
                //console.log(averageRateBottom800);
                callback(null);
            }
        }

    });
}


var averageYearRateBottom800 = [];
function getCloseAverageYearRateBottom800(callback){

    sqlSentence = 'SELECT name, code, average_year_rate FROM share_close_max_min ORDER BY average_year_rate ASC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT CloseaverageRateBottom50 ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        var i;
        averageYearRateBottom800.length = 0;
        var name, code, rate;
        for(i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].average_year_rate;
            averageYearRateBottom800.push([code,name, rate]);  //code ahead, sort by the first word
            if(i === result.length-1){
                //console.log(averageYearRateBottom800);
                callback(null);
            }
        }

    });
}

//=========================================================================================================
var minRateTop800 = [];
function getCloseMinRateTop800(callback){

    sqlSentence = 'SELECT name, code, min_rate FROM share_close_max_min ORDER BY min_rate DESC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT CloseMinRateTop50 ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        var i;
        minRateTop800.length = 0;
        var name, code, rate;
        for(i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].min_rate;
            minRateTop800.push([code,name, rate]);  //code ahead, sort by the first word
            if(i === result.length-1){
                //console.log(minRateTop800);
                callback(null);
            }
        }

    });
}

var minYearRateTop800 = [];
function getCloseMinYearRateTop800(callback){

    sqlSentence = 'SELECT name, code, min_year_rate FROM share_close_max_min ORDER BY min_year_rate DESC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT CloseMinRateTop50 ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        var i;
        minYearRateTop800.length = 0;
        var name, code, rate;
        for(i=0; i< result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].min_year_rate;
            minYearRateTop800.push([code, name, rate]); //code ahead, sort by the first word
            if(i === result.length-1){
                //console.log(minYearRateTop800);
                callback(null);
            }
        }

    });

}

var maxRateTop800 = [];
function getCloseMaxRateTop800(callback){

    sqlSentence = 'SELECT name, code, max_rate FROM share_close_max_min ORDER BY max_rate DESC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT CloseMaxRateTop50 ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        var i;
        maxRateTop800.length = 0;
        var name, code, rate;
        for(i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].max_rate;
            maxRateTop800.push([code,name, rate]);  //code ahead, sort by the first word
            if(i === result.length-1){
                //console.log(maxRateTop800);
                callback(null);
            }
        }

    });
}

var maxYearRateTop800 = [];
function getCloseMaxYearRateTop800(callback){

    sqlSentence = 'SELECT name, code, max_year_rate FROM share_close_max_min ORDER BY max_year_rate DESC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT CloseMaxRateTop50 ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        var i;
        maxYearRateTop800.length = 0;
        var name, code, rate;
        for(i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].max_year_rate;
            maxYearRateTop800.push([code,name, rate]);  //code ahead, sort by the first word
            if(i === result.length-1){
                //console.log(maxYearRateTop800);
                callback(null);
            }
        }

    });
}


var averageRateTop800 = [];
function getCloseAverageRateTop800(callback){

    sqlSentence = 'SELECT name, code, average_rate FROM share_close_max_min ORDER BY average_rate DESC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT CloseaverageRateTop50 ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        var i;
        averageRateTop800.length = 0;
        var name, code, rate;
        for(i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].average_rate;
            averageRateTop800.push([code,name, rate]);  //code ahead, sort by the first word
            if(i === result.length-1){
                //console.log(averageRateTop800);
                callback(null);
            }
        }

    });
}


var averageYearRateTop800 = [];
function getCloseAverageYearRateTop800(callback){

    sqlSentence = 'SELECT name, code, average_year_rate FROM share_close_max_min ORDER BY average_year_rate DESC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT CloseaverageRateTop50 ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        var i;
        averageYearRateTop800.length = 0;
        var name, code, rate;
        for(i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].average_year_rate;
            averageYearRateTop800.push([code,name, rate]);  //code ahead, sort by the first word
            if(i === result.length-1){
                //console.log(averageYearRateTop800);
                callback(null);
            }
        }

    });
}




function getCloseRate(callback){
    async.parallel([
        function(callback){
            getCloseMaxRateBottom800(callback);
        },

        function(callback){
            getCloseMaxYearRateBottom800(callback);
        },

        function(callback){
            getCloseMinRateBottom800(callback);
        },

        function(callback){
            getCloseMinYearRateBottom800(callback);
        },

        function(callback){
            getCloseAverageRateBottom800(callback);
        },

        function(callback){
            getCloseAverageYearRateBottom800(callback);
        },

        function(callback){
            getCloseMaxRateTop800(callback);
        },

        function(callback){
            getCloseMaxYearRateTop800(callback);
        },

        function(callback){
            getCloseMinRateTop800(callback);
        },

        function(callback){
            getCloseMinYearRateTop800(callback);
        },

        function(callback){
            getCloseAverageRateTop800(callback);
        },

        function(callback){
            getCloseAverageYearRateTop800(callback);
        }

    ], function(err, result){
        if(err){
            console.log('parallel err', err.message);
        }else{
            // console.log(maxRateBottom800);
            // console.log(maxYearRateBottom800);
            // console.log(minRateBottom800);
            // console.log(minYearRateBottom800);
            // console.log(averageRateBottom800);
            // console.log(averageYearRateBottom800);
            //
            // console.log(maxRateTop800);
            // console.log(maxYearRateTop800);
            // console.log(minRateTop800);
            // console.log(minYearRateTop800);
            // console.log(averageRateTop800);
            // console.log(averageYearRateTop800);
            callback(null);
        }

    })
}

//=======================================================================================================
//=======================================================================================================
var changeWeekRateBottom800 = [];
function getChangeWeekRateBottom800(callback){

    sqlSentence = 'SELECT name, code, weekRate FROM share_change_rate_list ORDER BY weekRate ASC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT change_weekRate ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        changeWeekRateBottom800.length = 0;
        var name, code, rate;
        for(var i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].weekRate;
            changeWeekRateBottom800.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}


var changeMonthRateBottom800 = [];
function getChangeMonthRateBottom800(callback){

    sqlSentence = 'SELECT name, code, monthRate FROM share_change_rate_list ORDER BY monthRate ASC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT change_monthRate ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        changeMonthRateBottom800.length = 0;
        var name, code, rate;
        for(var i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].monthRate;
            changeMonthRateBottom800.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}


var changeSeasonRateBottom800 = [];
function getChangeSeasonRateBottom800(callback){

    sqlSentence = 'SELECT name, code, seasonRate FROM share_change_rate_list ORDER BY seasonRate ASC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT change_SeasonRate ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        changeSeasonRateBottom800.length = 0;
        var name, code, rate;
        for(var i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].seasonRate;
            changeSeasonRateBottom800.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}

var changeHalfYearRateBottom800 = [];
function getChangeHalfYearRateBottom800(callback){

    sqlSentence = 'SELECT name, code, halfYearRate FROM share_change_rate_list ORDER BY halfYearRate ASC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT change_halfYearRate ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        changeHalfYearRateBottom800.length = 0;
        var name, code, rate;
        for(var i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].halfYearRate;
            changeHalfYearRateBottom800.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}

var changeYearRateBottom800 = [];
function getChangeYearRateBottom800(callback){

    sqlSentence = 'SELECT name, code, oneYearRate FROM share_change_rate_list ORDER BY oneYearRate ASC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT change_oneYearRate ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        changeYearRateBottom800.length = 0;
        var name, code, rate;
        for(var i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].oneYearRate;
            changeYearRateBottom800.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}

var changeTwoYearRateBottom800 = [];
function getChangeTwoYearRateBottom800(callback){

    sqlSentence = 'SELECT name, code, twoYearRate FROM share_change_rate_list ORDER BY twoYearRate ASC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT change_twoYearRate ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        changeTwoYearRateBottom800.length = 0;
        var name, code, rate;
        for(var i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].twoYearRate;
            changeTwoYearRateBottom800.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}

var changeThreeYearRateBottom800 = [];
function getChangeThreeYearRateBottom800(callback){

    sqlSentence = 'SELECT name, code, threeYearRate FROM share_change_rate_list ORDER BY threeYearRate ASC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT change_threeYearRate ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        changeThreeYearRateBottom800.length = 0;
        var name, code, rate;
        for(var i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].threeYearRate;
            changeThreeYearRateBottom800.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}


var changeFourYearRateBottom800 = [];
function getChangeFourYearRateBottom800(callback){

    sqlSentence = 'SELECT name, code, fourYearRate FROM share_change_rate_list ORDER BY fourYearRate ASC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT change_fourYearRate ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        changeFourYearRateBottom800.length = 0;
        var name, code, rate;
        for(var i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].fourYearRate;
            changeFourYearRateBottom800.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}
//========================================================================================================
var changeWeekRateTop800 = [];
function getChangeWeekRateTop800(callback){

    sqlSentence = 'SELECT name, code, weekRate FROM share_change_rate_list ORDER BY weekRate DESC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT change_weekRate ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        changeWeekRateTop800.length = 0;
        var name, code, rate;
        for(var i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].weekRate;
            changeWeekRateTop800.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}


var changeMonthRateTop800 = [];
function getChangeMonthRateTop800(callback){

    sqlSentence = 'SELECT name, code, monthRate FROM share_change_rate_list ORDER BY monthRate DESC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT change_monthRate ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        changeMonthRateTop800.length = 0;
        var name, code, rate;
        for(var i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].monthRate;
            changeMonthRateTop800.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}


var changeSeasonRateTop800 = [];
function getChangeSeasonRateTop800(callback){

    sqlSentence = 'SELECT name, code, seasonRate FROM share_change_rate_list ORDER BY seasonRate DESC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT change_SeasonRate ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        changeSeasonRateTop800.length = 0;
        var name, code, rate;
        for(var i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].seasonRate;
            changeSeasonRateTop800.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}

var changeHalfYearRateTop800 = [];
function getChangeHalfYearRateTop800(callback){

    sqlSentence = 'SELECT name, code, halfYearRate FROM share_change_rate_list ORDER BY halfYearRate DESC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT change_halfYearRate ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        changeHalfYearRateTop800.length = 0;
        var name, code, rate;
        for(var i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].halfYearRate;
            changeHalfYearRateTop800.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}

var changeYearRateTop800 = [];
function getChangeYearRateTop800(callback){

    sqlSentence = 'SELECT name, code, oneYearRate FROM share_change_rate_list ORDER BY oneYearRate DESC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT change_oneYearRate ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        changeYearRateTop800.length = 0;
        var name, code, rate;
        for(var i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].oneYearRate;
            changeYearRateTop800.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}

var changeTwoYearRateTop800 = [];
function getChangeTwoYearRateTop800(callback){

    sqlSentence = 'SELECT name, code, twoYearRate FROM share_change_rate_list ORDER BY twoYearRate DESC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT change_twoYearRate ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        changeTwoYearRateTop800.length = 0;
        var name, code, rate;
        for(var i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].twoYearRate;
            changeTwoYearRateTop800.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}

var changeThreeYearRateTop800 = [];
function getChangeThreeYearRateTop800(callback){

    sqlSentence = 'SELECT name, code, threeYearRate FROM share_change_rate_list ORDER BY threeYearRate DESC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT change_threeYearRate ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        changeThreeYearRateTop800.length = 0;
        var name, code, rate;
        for(var i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].threeYearRate;
            changeThreeYearRateTop800.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}


var changeFourYearRateTop800 = [];
function getChangeFourYearRateTop800(callback){

    sqlSentence = 'SELECT name, code, fourYearRate FROM share_change_rate_list ORDER BY fourYearRate DESC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT change_fourYearRate ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        changeFourYearRateTop800.length = 0;
        var name, code, rate;
        for(var i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].fourYearRate;
            changeFourYearRateTop800.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}



function getChangeRate(callback){
    async.parallel([
        function(callback){
            getChangeWeekRateBottom800(callback);
        },

        function(callback){
            getChangeMonthRateBottom800(callback);
        },

        function(callback){
            getChangeSeasonRateBottom800(callback);
        },

        function(callback){
            getChangeHalfYearRateBottom800(callback);
        },

        function(callback){
            getChangeYearRateBottom800(callback);
        },

        function(callback){
            getChangeTwoYearRateBottom800(callback);
        },

        function(callback){
            getChangeThreeYearRateBottom800(callback);
        },

        function(callback){
            getChangeFourYearRateBottom800(callback);
        },

        function(callback){
            getChangeWeekRateTop800(callback);
        },

        function(callback){
            getChangeMonthRateTop800(callback);
        },

        function(callback){
            getChangeSeasonRateTop800(callback);
        },

        function(callback){
            getChangeHalfYearRateTop800(callback);
        },

        function(callback){
            getChangeYearRateTop800(callback);
        },

        function(callback){
            getChangeTwoYearRateTop800(callback);
        },

        function(callback){
            getChangeThreeYearRateTop800(callback);
        },

        function(callback){
            getChangeFourYearRateTop800(callback);
        }

    ], function(err, result){
        if(err){
            console.log('parallel err', err.message);
        }else{
            // console.log(changeWeekRateBottom800);
            // console.log(changeMonthRateBottom800);
            // console.log(changeSeasonRateBottom800);
            // console.log(changeYearRateBottom800);
            // console.log(changeTwoYearRateBottom800);
            // console.log(changeThreeYearRateBottom800);
            // console.log(changeFourYearRateBottom800);
            // console.log(changeHalfYearRateBottom800);

            // console.log(changeWeekRateTop800);
            // console.log(changeMonthRateTop800);
            // console.log(changeSeasonRateTop800);
            // console.log(changeYearRateTop800);
            // console.log(changeTwoYearRateTop800);
            // console.log(changeThreeYearRateTop800);
            // console.log(changeFourYearRateTop800);
            // console.log(changeHalfYearRateTop800);

            callback(null);
        }

    })
}
//=======================================================================================================
//=======================================================================================================
var continueDownTimeBottom800 = [];
function getContinueDownTimeBottom800(callback){

    sqlSentence = 'SELECT name, code, continueDownTime FROM share_change_rate_list ORDER BY continueDownTime ASC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT continueDownTime ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        continueDownTimeBottom800.length = 0;
        var name, code, rate;
        for(var i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].continueDownTime;
            continueDownTimeBottom800.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}


var continueDownValueBottom800 = [];
function getContinueDownValueBottom800(callback){

    sqlSentence = 'SELECT name, code, continueDownValue FROM share_change_rate_list ORDER BY continueDownValue ASC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT continueDownValue ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        continueDownValueBottom800.length = 0;
        var name, code, rate;
        for(var i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].continueDownValue;
            continueDownValueBottom800.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}

var continueDownTimeTop800 = [];
function getContinueDownTimeTop800(callback){

    sqlSentence = 'SELECT name, code, continueDownTime FROM share_change_rate_list ORDER BY continueDownTime DESC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT continueDownTime ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        continueDownTimeTop800.length = 0;
        var name, code, rate;
        for(var i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].continueDownTime;
            continueDownTimeTop800.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}


var continueDownValueTop800 = [];
function getContinueDownValueTop800(callback){

    sqlSentence = 'SELECT name, code, continueDownValue FROM share_change_rate_list ORDER BY continueDownValue DESC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT continueDownValue ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        continueDownValueTop800.length = 0;
        var name, code, rate;
        for(var i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].continueDownValue;
            continueDownValueTop800.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}


var continueUpTimeBottom800 = [];
function getContinueUpTimeBottom800(callback){

    sqlSentence = 'SELECT name, code, continueUpTime FROM share_change_rate_list ORDER BY continueUpTime ASC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT continueUpTime ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        continueUpTimeBottom800.length = 0;
        var name, code, rate;
        for(var i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].continueUpTime;
            continueUpTimeBottom800.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}


var continueUpValueBottom800 = [];
function getContinueUpValueBottom800(callback){

    sqlSentence = 'SELECT name, code, continueUpValue FROM share_change_rate_list ORDER BY continueUpValue ASC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT continueUpValue ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        continueUpValueBottom800.length = 0;
        var name, code, rate;
        for(var i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].continueUpValue;
            continueUpValueBottom800.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}

var continueUpTimeTop800 = [];
function getContinueUpTimeTop800(callback){

    sqlSentence = 'SELECT name, code, continueUpTime FROM share_change_rate_list ORDER BY continueUpTime DESC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT continueUpTime ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        continueUpTimeTop800.length = 0;
        var name, code, rate;
        for(var i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].continueUpTime;
            continueUpTimeTop800.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}


var continueUpValueTop800 = [];
function getContinueUpValueTop800(callback){

    sqlSentence = 'SELECT name, code, continueUpValue FROM share_change_rate_list ORDER BY continueUpValue DESC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT continueUpValue ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        continueUpValueTop800.length = 0;
        var name, code, rate;
        for(var i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].continueUpValue;
            continueUpValueTop800.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}

function getContinueData(callback){
    async.parallel([
        function(callback){
            getContinueDownTimeBottom800(callback);
        },

        function(callback){
            getContinueDownValueBottom800(callback);
        },

        function(callback){
            getContinueDownTimeTop800(callback);
        },

        function(callback){
            getContinueDownValueTop800(callback);
        },

        function(callback){
            getContinueUpTimeBottom800(callback);
        },

        function(callback){
            getContinueUpValueBottom800(callback);
        },

        function(callback){
            getContinueUpTimeTop800(callback);
        },

        function(callback){
            getContinueUpValueTop800(callback);
        }

    ], function(err, result){
        if(err){
            console.log('parallel err', err.message);
        }else{
            // console.log(continueDownTimeBottom800);
            // console.log(continueDownValueBottom800);
            // console.log(continueDownTimeTop800);
            // console.log(continueDownValueTop800);
            //
            // console.log(continueUpTimeBottom800);
            // console.log(continueUpValueBottom800);
            // console.log(continueUpTimeTop800);
            // console.log(continueUpValueTop800);
            callback(null);
        }

    })
}

//=======================================================================================================
//=======================================================================================================
var segmentDownRateBottom800 = [];
function getSegmentDownRateBottom800(callback){

    sqlSentence = 'SELECT name, code, segmentDownRate FROM share_change_rate_list ORDER BY segmentDownRate ASC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT segmentDownRate ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        segmentDownRateBottom800.length = 0;
        var name, code, rate;
        for(var i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].segmentDownRate;
            segmentDownRateBottom800.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}


var segmentDownGoalBottom800 = [];
function getSegmentDownGoalBottom800(callback){

    sqlSentence = 'SELECT name, code, segmentDownGoal FROM share_change_rate_list ORDER BY segmentDownGoal ASC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT segmentDownGoal ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        segmentDownGoalBottom800.length = 0;
        var name, code, rate;
        for(var i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].segmentDownGoal;
            segmentDownGoalBottom800.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}

var segmentDownDaysBottom800 = [];
function getSegmentDownDaysBottom800(callback){

    sqlSentence = 'SELECT name, code, segmentDownDays FROM share_change_rate_list ORDER BY segmentDownDays ASC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT segmentDownDays ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        segmentDownDaysBottom800.length = 0;
        var name, code, rate;
        for(var i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].segmentDownDays;
            segmentDownDaysBottom800.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}


var segmentUpRateBottom800 = [];
function getSegmentUpRateBottom800(callback){

    sqlSentence = 'SELECT name, code, segmentUpRate FROM share_change_rate_list ORDER BY segmentUpRate ASC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT segmentUpRate ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        segmentUpRateBottom800.length = 0;
        var name, code, rate;
        for(var i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].segmentUpRate;
            segmentUpRateBottom800.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}


var segmentUpGoalBottom800 = [];
function getSegmentUpGoalBottom800(callback){

    sqlSentence = 'SELECT name, code, segmentUpGoal FROM share_change_rate_list ORDER BY segmentUpGoal ASC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT segmentUpGoal ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        segmentUpGoalBottom800.length = 0;
        var name, code, rate;
        for(var i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].segmentUpGoal;
            segmentUpGoalBottom800.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}

var segmentUpDaysBottom800 = [];
function getSegmentUpDaysBottom800(callback){

    sqlSentence = 'SELECT name, code, segmentUpDays FROM share_change_rate_list ORDER BY segmentUpDays ASC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT segmentUpDays ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        segmentUpDaysBottom800.length = 0;
        var name, code, rate;
        for(var i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].segmentUpDays;
            segmentUpDaysBottom800.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}

var segmentDownRateTop800 = [];
function getSegmentDownRateTop800(callback){

    sqlSentence = 'SELECT name, code, segmentDownRate FROM share_change_rate_list ORDER BY segmentDownRate DESC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT segmentDownRate ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        segmentDownRateTop800.length = 0;
        var name, code, rate;
        for(var i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].segmentDownRate;
            segmentDownRateTop800.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}


var segmentDownGoalTop800 = [];
function getSegmentDownGoalTop800(callback){

    sqlSentence = 'SELECT name, code, segmentDownGoal FROM share_change_rate_list ORDER BY segmentDownGoal DESC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT segmentDownGoal ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        segmentDownGoalTop800.length = 0;
        var name, code, rate;
        for(var i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].segmentDownGoal;
            segmentDownGoalTop800.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}

var segmentDownDaysTop800 = [];
function getSegmentDownDaysTop800(callback){

    sqlSentence = 'SELECT name, code, segmentDownDays FROM share_change_rate_list ORDER BY segmentDownDays DESC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT segmentDownDays ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        segmentDownDaysTop800.length = 0;
        var name, code, rate;
        for(var i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].segmentDownDays;
            segmentDownDaysTop800.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}


var segmentUpRateTop800 = [];
function getSegmentUpRateTop800(callback){

    sqlSentence = 'SELECT name, code, segmentUpRate FROM share_change_rate_list ORDER BY segmentUpRate DESC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT segmentUpRate ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        segmentUpRateTop800.length = 0;
        var name, code, rate;
        for(var i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].segmentUpRate;
            segmentUpRateTop800.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}


var segmentUpGoalTop800 = [];
function getSegmentUpGoalTop800(callback){

    sqlSentence = 'SELECT name, code, segmentUpGoal FROM share_change_rate_list ORDER BY segmentUpGoal DESC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT segmentUpGoal ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        segmentUpGoalTop800.length = 0;
        var name, code, rate;
        for(var i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].segmentUpGoal;
            segmentUpGoalTop800.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}

var segmentUpDaysTop800 = [];
function getSegmentUpDaysTop800(callback){

    sqlSentence = 'SELECT name, code, segmentUpDays FROM share_change_rate_list ORDER BY segmentUpDays DESC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT segmentUpDays ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        segmentUpDaysTop800.length = 0;
        var name, code, rate;
        for(var i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].segmentUpDays;
            segmentUpDaysTop800.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}


function getSegmentData(callback){
    async.parallel([
        function(callback){
            getSegmentDownRateBottom800(callback);
        },

        function(callback){
            getSegmentDownGoalBottom800(callback);
        },

        function(callback){
            getSegmentDownDaysBottom800(callback);
        },

        function(callback){
            getSegmentUpRateBottom800(callback);
        },

        function(callback){
            getSegmentUpGoalBottom800(callback);
        },

        function(callback){
            getSegmentUpDaysBottom800(callback);
        },

        function(callback){
            getSegmentDownRateTop800(callback);
        },

        function(callback){
            getSegmentDownGoalTop800(callback);
        },

        function(callback){
            getSegmentDownDaysTop800(callback);
        },

        function(callback){
            getSegmentUpRateTop800(callback);
        },

        function(callback){
            getSegmentUpGoalTop800(callback);
        },

        function(callback){
            getSegmentUpDaysTop800(callback);
        }

    ], function(err, result){
        if(err){
            console.log('parallel err', err.message);
        }else{
            // console.log(segmentDownRateBottom800);
            // console.log(segmentDownGoalBottom800);
            // console.log(segmentDownDaysBottom800);
            // console.log(segmentUpRateBottom800);
            // console.log(segmentUpGoalBottom800);
            // console.log(segmentUpDaysBottom800);
            //
            // console.log(segmentDownRateTop800);
            // console.log(segmentDownGoalTop800);
            // console.log(segmentDownDaysTop800);
            // console.log(segmentUpRateTop800);
            // console.log(segmentUpGoalTop800);
            // console.log(segmentUpDaysTop800);

            callback(null);
        }

    })
}

//=======================================================================================================
//=======================================================================================================
//=======================================================================================================
var stableMonthGaolBottom800 = [];
function getStableMonthGoalBottom800(callback){

    sqlSentence = 'SELECT name, code, stableMonthGoal FROM share_change_rate_list ORDER BY stableMonthGoal ASC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT stableMonthGoal ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        stableMonthGaolBottom800.length = 0;
        var name, code, rate;
        for(var i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].stableMonthGoal;
            stableMonthGaolBottom800.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}

var stableSeasonGaolBottom800 = [];
function getStableSeasonGoalBottom800(callback){

    sqlSentence = 'SELECT name, code, stableSeasonGoal FROM share_change_rate_list ORDER BY stableSeasonGoal ASC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT stableSeasonGoal ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        stableSeasonGaolBottom800.length = 0;
        var name, code, rate;
        for(var i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].stableSeasonGoal;
            stableSeasonGaolBottom800.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}

var stableHalfYearGaolBottom800 = [];
function getStableHalfYearGoalBottom800(callback){

    sqlSentence = 'SELECT name, code, stableHalfYearGoal FROM share_change_rate_list ORDER BY stableHalfYearGoal ASC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT stableHalfYearGoal ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        stableHalfYearGaolBottom800.length = 0;
        var name, code, rate;
        for(var i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].stableHalfYearGoal;
            stableHalfYearGaolBottom800.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}

var stableYearGaolBottom800 = [];
function getStableYearGoalBottom800(callback){

    sqlSentence = 'SELECT name, code, stableYearGoal FROM share_change_rate_list ORDER BY stableYearGoal ASC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT stableYearGoal ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        stableYearGaolBottom800.length = 0;
        var name, code, rate;
        for(var i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].stableYearGoal;
            stableYearGaolBottom800.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}

var stableTwoYearGaolBottom800 = [];
function getStableTwoYearGoalBottom800(callback){

    sqlSentence = 'SELECT name, code, stableTwoYearGoal FROM share_change_rate_list ORDER BY stableTwoYearGoal ASC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT stableTwoYearGoal ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        stableTwoYearGaolBottom800.length = 0;
        var name, code, rate;
        for(var i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].stableTwoYearGoal;
            stableTwoYearGaolBottom800.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}

var stableThreeYearGaolBottom800 = [];
function getStableThreeYearGoalBottom800(callback){

    sqlSentence = 'SELECT name, code, stableThreeYearGoal FROM share_change_rate_list ORDER BY stableThreeYearGoal ASC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT stableThreeYearGoal ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        stableThreeYearGaolBottom800.length = 0;
        var name, code, rate;
        for(var i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].stableThreeYearGoal;
            stableThreeYearGaolBottom800.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}

var stableFourYearGaolBottom800 = [];
function getStableFourYearGoalBottom800(callback){

    sqlSentence = 'SELECT name, code, stableFourYearGoal FROM share_change_rate_list ORDER BY stableFourYearGoal ASC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT stableFourYearGoal ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        stableFourYearGaolBottom800.length = 0;
        var name, code, rate;
        for(var i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].stableFourYearGoal;
            stableFourYearGaolBottom800.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}


var stableMonthGaolTop800 = [];
function getStableMonthGoalTop800(callback){

    sqlSentence = 'SELECT name, code, stableMonthGoal FROM share_change_rate_list ORDER BY stableMonthGoal DESC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT stableMonthGoal ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        stableMonthGaolTop800.length = 0;
        var name, code, rate;
        for(var i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].stableMonthGoal;
            stableMonthGaolTop800.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}

var stableSeasonGaolTop800 = [];
function getStableSeasonGoalTop800(callback){

    sqlSentence = 'SELECT name, code, stableSeasonGoal FROM share_change_rate_list ORDER BY stableSeasonGoal DESC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT stableSeasonGoal ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        stableSeasonGaolTop800.length = 0;
        var name, code, rate;
        for(var i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].stableSeasonGoal;
            stableSeasonGaolTop800.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}

var stableHalfYearGaolTop800 = [];
function getStableHalfYearGoalTop800(callback){

    sqlSentence = 'SELECT name, code, stableHalfYearGoal FROM share_change_rate_list ORDER BY stableHalfYearGoal DESC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT stableHalfYearGoal ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        stableHalfYearGaolTop800.length = 0;
        var name, code, rate;
        for(var i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].stableHalfYearGoal;
            stableHalfYearGaolTop800.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}

var stableYearGaolTop800 = [];
function getStableYearGoalTop800(callback){

    sqlSentence = 'SELECT name, code, stableYearGoal FROM share_change_rate_list ORDER BY stableYearGoal DESC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT stableYearGoal ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        stableYearGaolTop800.length = 0;
        var name, code, rate;
        for(var i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].stableYearGoal;
            stableYearGaolTop800.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}

var stableTwoYearGaolTop800 = [];
function getStableTwoYearGoalTop800(callback){

    sqlSentence = 'SELECT name, code, stableTwoYearGoal FROM share_change_rate_list ORDER BY stableTwoYearGoal DESC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT stableTwoYearGoal ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        stableTwoYearGaolTop800.length = 0;
        var name, code, rate;
        for(var i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].stableTwoYearGoal;
            stableTwoYearGaolTop800.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}

var stableThreeYearGaolTop800 = [];
function getStableThreeYearGoalTop800(callback){

    sqlSentence = 'SELECT name, code, stableThreeYearGoal FROM share_change_rate_list ORDER BY stableThreeYearGoal DESC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT stableThreeYearGoal ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        stableThreeYearGaolTop800.length = 0;
        var name, code, rate;
        for(var i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].stableThreeYearGoal;
            stableThreeYearGaolTop800.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}

var stableFourYearGaolTop800 = [];
function getStableFourYearGoalTop800(callback){

    sqlSentence = 'SELECT name, code, stableFourYearGoal FROM share_change_rate_list ORDER BY stableFourYearGoal DESC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT stableFourYearGoal ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        stableFourYearGaolTop800.length = 0;
        var name, code, rate;
        for(var i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].stableFourYearGoal;
            stableFourYearGaolTop800.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}


function getStableData(callback){
    async.parallel([
        function(callback){
            getStableMonthGoalBottom800(callback);
        },

        function(callback){
            getStableSeasonGoalBottom800(callback);
        },

        function(callback){
            getStableHalfYearGoalBottom800(callback);
        },

        function(callback){
            getStableYearGoalBottom800(callback);
        },

        function(callback){
            getStableTwoYearGoalBottom800(callback);
        },

        function(callback){
            getStableThreeYearGoalBottom800(callback);
        },

        function(callback){
            getStableFourYearGoalBottom800(callback);
        },

        function(callback){
            getStableMonthGoalTop800(callback);
        },

        function(callback){
            getStableSeasonGoalTop800(callback);
        },

        function(callback){
            getStableHalfYearGoalTop800(callback);
        },

        function(callback){
            getStableYearGoalTop800(callback);
        },

        function(callback){
            getStableTwoYearGoalTop800(callback);
        },

        function(callback){
            getStableThreeYearGoalTop800(callback);
        },

        function(callback){
            getStableFourYearGoalTop800(callback);
        }


    ], function(err, result){
        if(err){
            console.log('parallel err', err.message);
        }else{
            // console.log(stableMonthGaolBottom800);
            // console.log(stableSeasonGaolBottom800);
            // console.log(stableHalfYearGaolBottom800);
            // console.log(stableTwoYearGaolBottom800);
            // console.log(stableThreeYearGaolBottom800);
            // console.log(stableFourYearGaolBottom800);
            //
            // console.log(stableMonthGaolTop800);
            // console.log(stableSeasonGaolTop800);
            // console.log(stableHalfYearGaolTop800);
            // console.log(stableTwoYearGaolTop800);
            // console.log(stableThreeYearGaolTop800);
            // console.log(stableFourYearGaolTop800);

            callback(null);
        }

    })
}


//=======================================================================================================
//=======================================================================================================
//=======================================================================================================
var activityMonthGaolBottom800 = [];
function getActivityMonthGoalBottom800(callback){

    sqlSentence = 'SELECT name, code, activityMonthGoal FROM share_change_rate_list ORDER BY activityMonthGoal ASC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT activityMonthGoal ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        activityMonthGaolBottom800.length = 0;
        var name, code, rate;
        for(var i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].activityMonthGoal;
            activityMonthGaolBottom800.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}

var activitySeasonGaolBottom800 = [];
function getActivitySeasonGoalBottom800(callback){

    sqlSentence = 'SELECT name, code, activitySeasonGoal FROM share_change_rate_list ORDER BY activitySeasonGoal ASC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT activitySeasonGoal ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        activitySeasonGaolBottom800.length = 0;
        var name, code, rate;
        for(var i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].activitySeasonGoal;
            activitySeasonGaolBottom800.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}

var activityHalfYearGaolBottom800 = [];
function getActivityHalfYearGoalBottom800(callback){

    sqlSentence = 'SELECT name, code, activityHalfYearGoal FROM share_change_rate_list ORDER BY activityHalfYearGoal ASC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT activityHalfYearGoal ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        activityHalfYearGaolBottom800.length = 0;
        var name, code, rate;
        for(var i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].activityHalfYearGoal;
            activityHalfYearGaolBottom800.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}

var activityYearGaolBottom800 = [];
function getActivityYearGoalBottom800(callback){

    sqlSentence = 'SELECT name, code, activityYearGoal FROM share_change_rate_list ORDER BY activityYearGoal ASC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT activityYearGoal ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        activityYearGaolBottom800.length = 0;
        var name, code, rate;
        for(var i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].activityYearGoal;
            activityYearGaolBottom800.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}

var activityTwoYearGaolBottom800 = [];
function getActivityTwoYearGoalBottom800(callback){

    sqlSentence = 'SELECT name, code, activityTwoYearGoal FROM share_change_rate_list ORDER BY activityTwoYearGoal ASC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT activityTwoYearGoal ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        activityTwoYearGaolBottom800.length = 0;
        var name, code, rate;
        for(var i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].activityTwoYearGoal;
            activityTwoYearGaolBottom800.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}

var activityThreeYearGaolBottom800 = [];
function getActivityThreeYearGoalBottom800(callback){

    sqlSentence = 'SELECT name, code, activityThreeYearGoal FROM share_change_rate_list ORDER BY activityThreeYearGoal ASC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT activityThreeYearGoal ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        activityThreeYearGaolBottom800.length = 0;
        var name, code, rate;
        for(var i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].activityThreeYearGoal;
            activityThreeYearGaolBottom800.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}

var activityFourYearGaolBottom800 = [];
function getActivityFourYearGoalBottom800(callback){

    sqlSentence = 'SELECT name, code, activityFourYearGoal FROM share_change_rate_list ORDER BY activityFourYearGoal ASC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT activityFourYearGoal ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        activityFourYearGaolBottom800.length = 0;
        var name, code, rate;
        for(var i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].activityFourYearGoal;
            activityFourYearGaolBottom800.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}


var activityMonthGaolTop800 = [];
function getActivityMonthGoalTop800(callback){

    sqlSentence = 'SELECT name, code, activityMonthGoal FROM share_change_rate_list ORDER BY activityMonthGoal DESC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT activityMonthGoal ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        activityMonthGaolTop800.length = 0;
        var name, code, rate;
        for(var i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].activityMonthGoal;
            activityMonthGaolTop800.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}

var activitySeasonGaolTop800 = [];
function getActivitySeasonGoalTop800(callback){

    sqlSentence = 'SELECT name, code, activitySeasonGoal FROM share_change_rate_list ORDER BY activitySeasonGoal DESC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT activitySeasonGoal ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        activitySeasonGaolTop800.length = 0;
        var name, code, rate;
        for(var i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].activitySeasonGoal;
            activitySeasonGaolTop800.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}

var activityHalfYearGaolTop800 = [];
function getActivityHalfYearGoalTop800(callback){

    sqlSentence = 'SELECT name, code, activityHalfYearGoal FROM share_change_rate_list ORDER BY activityHalfYearGoal DESC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT activityHalfYearGoal ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        activityHalfYearGaolTop800.length = 0;
        var name, code, rate;
        for(var i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].activityHalfYearGoal;
            activityHalfYearGaolTop800.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}

var activityYearGaolTop800 = [];
function getActivityYearGoalTop800(callback){

    sqlSentence = 'SELECT name, code, activityYearGoal FROM share_change_rate_list ORDER BY activityYearGoal DESC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT activityYearGoal ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        activityYearGaolTop800.length = 0;
        var name, code, rate;
        for(var i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].activityYearGoal;
            activityYearGaolTop800.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}

var activityTwoYearGaolTop800 = [];
function getActivityTwoYearGoalTop800(callback){

    sqlSentence = 'SELECT name, code, activityTwoYearGoal FROM share_change_rate_list ORDER BY activityTwoYearGoal DESC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT activityTwoYearGoal ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        activityTwoYearGaolTop800.length = 0;
        var name, code, rate;
        for(var i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].activityTwoYearGoal;
            activityTwoYearGaolTop800.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}

var activityThreeYearGaolTop800 = [];
function getActivityThreeYearGoalTop800(callback){

    sqlSentence = 'SELECT name, code, activityThreeYearGoal FROM share_change_rate_list ORDER BY activityThreeYearGoal DESC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT activityThreeYearGoal ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        activityThreeYearGaolTop800.length = 0;
        var name, code, rate;
        for(var i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].activityThreeYearGoal;
            activityThreeYearGaolTop800.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}

var activityFourYearGaolTop800 = [];
function getActivityFourYearGoalTop800(callback){

    sqlSentence = 'SELECT name, code, activityFourYearGoal FROM share_change_rate_list ORDER BY activityFourYearGoal DESC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT activityFourYearGoal ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        activityFourYearGaolTop800.length = 0;
        var name, code, rate;
        for(var i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].activityFourYearGoal;
            activityFourYearGaolTop800.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}


function getActivityData(callback){
    async.parallel([
        function(callback){
            getActivityMonthGoalBottom800(callback);
        },

        function(callback){
            getActivitySeasonGoalBottom800(callback);
        },

        function(callback){
            getActivityHalfYearGoalBottom800(callback);
        },

        function(callback){
            getActivityYearGoalBottom800(callback);
        },

        function(callback){
            getActivityTwoYearGoalBottom800(callback);
        },

        function(callback){
            getActivityThreeYearGoalBottom800(callback);
        },

        function(callback){
            getActivityFourYearGoalBottom800(callback);
        },

        function(callback){
            getActivityMonthGoalTop800(callback);
        },

        function(callback){
            getActivitySeasonGoalTop800(callback);
        },

        function(callback){
            getActivityHalfYearGoalTop800(callback);
        },

        function(callback){
            getActivityYearGoalTop800(callback);
        },

        function(callback){
            getActivityTwoYearGoalTop800(callback);
        },

        function(callback){
            getActivityThreeYearGoalTop800(callback);
        },

        function(callback){
            getActivityFourYearGoalTop800(callback);
        }


    ], function(err, result){
        if(err){
            console.log('parallel err', err.message);
        }else{
            // console.log(activityMonthGaolBottom800);
            // console.log(activitySeasonGaolBottom800);
            // console.log(activityHalfYearGaolBottom800);
            // console.log(activityTwoYearGaolBottom800);
            // console.log(activityThreeYearGaolBottom800);
            // console.log(activityFourYearGaolBottom800);
            //
            // console.log(activityMonthGaolTop800);
            // console.log(activitySeasonGaolTop800);
            // console.log(activityHalfYearGaolTop800);
            // console.log(activityTwoYearGaolTop800);
            // console.log(activityThreeYearGaolTop800);
            // console.log(activityFourYearGaolTop800);

            callback(null);
        }

    })
}
//=======================================================================================================
//=======================================================================================================
var exchangeWeekRateBottom800 = [];
function getExchangeWeekRateBottom800(callback){

    sqlSentence = 'SELECT name, code, weekRate FROM share_exchange_rate_list ORDER BY weekRate ASC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT exchange_weekRate ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        exchangeWeekRateBottom800.length = 0;
        var name, code, rate;
        for(var i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].weekRate;
            exchangeWeekRateBottom800.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}


var exchangeMonthRateBottom800 = [];
function getExchangeMonthRateBottom800(callback){

    sqlSentence = 'SELECT name, code, monthRate FROM share_exchange_rate_list ORDER BY monthRate ASC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT exchange_monthRate ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        exchangeMonthRateBottom800.length = 0;
        var name, code, rate;
        for(var i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].monthRate;
            exchangeMonthRateBottom800.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}


var exchangeSeasonRateBottom800 = [];
function getExchangeSeasonRateBottom800(callback){

    sqlSentence = 'SELECT name, code, seasonRate FROM share_exchange_rate_list ORDER BY seasonRate ASC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT exchange_SeasonRate ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        exchangeSeasonRateBottom800.length = 0;
        var name, code, rate;
        for(var i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].seasonRate;
            exchangeSeasonRateBottom800.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}

var exchangeHalfYearRateBottom800 = [];
function getExchangeHalfYearRateBottom800(callback){

    sqlSentence = 'SELECT name, code, halfYearRate FROM share_exchange_rate_list ORDER BY halfYearRate ASC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT exchange_halfYearRate ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        exchangeHalfYearRateBottom800.length = 0;
        var name, code, rate;
        for(var i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].halfYearRate;
            exchangeHalfYearRateBottom800.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}

var exchangeYearRateBottom800 = [];
function getExchangeYearRateBottom800(callback){

    sqlSentence = 'SELECT name, code, oneYearRate FROM share_exchange_rate_list ORDER BY oneYearRate ASC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT exchange_oneYearRate ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        exchangeYearRateBottom800.length = 0;
        var name, code, rate;
        for(var i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].oneYearRate;
            exchangeYearRateBottom800.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}

var exchangeTwoYearRateBottom800 = [];
function getExchangeTwoYearRateBottom800(callback){

    sqlSentence = 'SELECT name, code, twoYearRate FROM share_exchange_rate_list ORDER BY twoYearRate ASC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT exchange_twoYearRate ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        exchangeTwoYearRateBottom800.length = 0;
        var name, code, rate;
        for(var i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].twoYearRate;
            exchangeTwoYearRateBottom800.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}

var exchangeThreeYearRateBottom800 = [];
function getExchangeThreeYearRateBottom800(callback){

    sqlSentence = 'SELECT name, code, threeYearRate FROM share_exchange_rate_list ORDER BY threeYearRate ASC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT exchange_threeYearRate ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        exchangeThreeYearRateBottom800.length = 0;
        var name, code, rate;
        for(var i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].threeYearRate;
            exchangeThreeYearRateBottom800.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}


var exchangeFourYearRateBottom800 = [];
function getExchangeFourYearRateBottom800(callback){

    sqlSentence = 'SELECT name, code, fourYearRate FROM share_exchange_rate_list ORDER BY fourYearRate ASC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT exchange_fourYearRate ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        exchangeFourYearRateBottom800.length = 0;
        var name, code, rate;
        for(var i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].fourYearRate;
            exchangeFourYearRateBottom800.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}
//========================================================================================================
var exchangeWeekRateTop800 = [];
function getExchangeWeekRateTop800(callback){

    sqlSentence = 'SELECT name, code, weekRate FROM share_exchange_rate_list ORDER BY weekRate DESC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT exchange_weekRate ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        exchangeWeekRateTop800.length = 0;
        var name, code, rate;
        for(var i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].weekRate;
            exchangeWeekRateTop800.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}


var exchangeMonthRateTop800 = [];
function getExchangeMonthRateTop800(callback){

    sqlSentence = 'SELECT name, code, monthRate FROM share_exchange_rate_list ORDER BY monthRate DESC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT exchange_monthRate ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        exchangeMonthRateTop800.length = 0;
        var name, code, rate;
        for(var i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].monthRate;
            exchangeMonthRateTop800.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}


var exchangeSeasonRateTop800 = [];
function getExchangeSeasonRateTop800(callback){

    sqlSentence = 'SELECT name, code, seasonRate FROM share_exchange_rate_list ORDER BY seasonRate DESC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT exchange_SeasonRate ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        exchangeSeasonRateTop800.length = 0;
        var name, code, rate;
        for(var i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].seasonRate;
            exchangeSeasonRateTop800.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}

var exchangeHalfYearRateTop800 = [];
function getExchangeHalfYearRateTop800(callback){

    sqlSentence = 'SELECT name, code, halfYearRate FROM share_exchange_rate_list ORDER BY halfYearRate DESC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT exchange_halfYearRate ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        exchangeHalfYearRateTop800.length = 0;
        var name, code, rate;
        for(var i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].halfYearRate;
            exchangeHalfYearRateTop800.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}

var exchangeYearRateTop800 = [];
function getExchangeYearRateTop800(callback){

    sqlSentence = 'SELECT name, code, oneYearRate FROM share_exchange_rate_list ORDER BY oneYearRate DESC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT exchange_oneYearRate ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        exchangeYearRateTop800.length = 0;
        var name, code, rate;
        for(var i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].oneYearRate;
            exchangeYearRateTop800.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}

var exchangeTwoYearRateTop800 = [];
function getExchangeTwoYearRateTop800(callback){

    sqlSentence = 'SELECT name, code, twoYearRate FROM share_exchange_rate_list ORDER BY twoYearRate DESC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT exchange_twoYearRate ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        exchangeTwoYearRateTop800.length = 0;
        var name, code, rate;
        for(var i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].twoYearRate;
            exchangeTwoYearRateTop800.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}

var exchangeThreeYearRateTop800 = [];
function getExchangeThreeYearRateTop800(callback){

    sqlSentence = 'SELECT name, code, threeYearRate FROM share_exchange_rate_list ORDER BY threeYearRate DESC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT exchange_threeYearRate ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        exchangeThreeYearRateTop800.length = 0;
        var name, code, rate;
        for(var i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].threeYearRate;
            exchangeThreeYearRateTop800.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}


var exchangeFourYearRateTop800 = [];
function getExchangeFourYearRateTop800(callback){

    sqlSentence = 'SELECT name, code, fourYearRate FROM share_exchange_rate_list ORDER BY fourYearRate DESC LIMIT 800';

    connection.query(sqlSentence, function(err, result) {
        if (err) {
            console.log("SELECT exchange_fourYearRate ERROR" , err.message);
            return 0;
        }

        //console.log(result);
        exchangeFourYearRateTop800.length = 0;
        var name, code, rate;
        for(var i=0; i<result.length; i++){
            name = result[i].name;
            code = result[i].code;
            rate = result[i].fourYearRate;
            exchangeFourYearRateTop800.push([code,name, rate]);  //code ahead, sort by the first word
        }

        callback(null);

    });
}



function getExchangeRate(callback){
    async.parallel([
        function(callback){
            getExchangeWeekRateBottom800(callback);
        },

        function(callback){
            getExchangeMonthRateBottom800(callback);
        },

        function(callback){
            getExchangeSeasonRateBottom800(callback);
        },

        function(callback){
            getExchangeHalfYearRateBottom800(callback);
        },

        function(callback){
            getExchangeYearRateBottom800(callback);
        },

        function(callback){
            getExchangeTwoYearRateBottom800(callback);
        },

        function(callback){
            getExchangeThreeYearRateBottom800(callback);
        },

        function(callback){
            getExchangeFourYearRateBottom800(callback);
        },

        function(callback){
            getExchangeWeekRateTop800(callback);
        },

        function(callback){
            getExchangeMonthRateTop800(callback);
        },

        function(callback){
            getExchangeSeasonRateTop800(callback);
        },

        function(callback){
            getExchangeHalfYearRateTop800(callback);
        },

        function(callback){
            getExchangeYearRateTop800(callback);
        },

        function(callback){
            getExchangeTwoYearRateTop800(callback);
        },

        function(callback){
            getExchangeThreeYearRateTop800(callback);
        },

        function(callback){
            getExchangeFourYearRateTop800(callback);
        }

    ], function(err, result){
        if(err){
            console.log('parallel err', err.message);
        }else{
            // console.log(exchangeWeekRateBottom800);
            // console.log(exchangeMonthRateBottom800);
            // console.log(exchangeSeasonRateBottom800);
            // console.log(exchangeYearRateBottom800);
            // console.log(exchangeTwoYearRateBottom800);
            // console.log(exchangeThreeYearRateBottom800);
            // console.log(exchangeFourYearRateBottom800);
            //
            // console.log(exchangeWeekRateTop800);
            // console.log(exchangeMonthRateTop800);
            // console.log(exchangeSeasonRateTop800);
            // console.log(exchangeYearRateTop800);
            // console.log(exchangeTwoYearRateTop800);
            // console.log(exchangeThreeYearRateTop800);
            // console.log(exchangeFourYearRateTop800);
            callback(null);
        }

    })
}





function mixArray(){ //parameter <=6
    var index = [];
    var isExits = [];
    for(var i=0; i<arguments.length; i++){
        index.push(1);
        isExits.push(true);
    }

    arrayMix.length = 0;
    for(index[0]=0; index[0]<arguments[0].length; index[0]++){
        for(index[1]=0; index[1]<arguments[1].length; index[1]++){
            if(arguments[0][index[0]][0] === arguments[1][index[1]][0]){
                if(isExits[2]){
                    for(index[2]=0; index[2]<arguments[2].length; index[2]++){
                        if(arguments[0][index[0]][0] === arguments[2][index[2]][0]){
                            if(isExits[3]){
                                for(index[3]=0; index[3]<arguments[3].length; index[3]++){
                                    if(arguments[0][index[0]][0] === arguments[3][index[3]][0]){
                                        if(isExits[4]){
                                            for(index[4]=0; index[4]<arguments[4].length; index[4]++){
                                                if(arguments[0][index[0]][0] === arguments[4][index[4]][0]){
                                                    if(isExits[5]){
                                                        for(index[5]=0; index[5]<arguments[5].length; index[5]++){
                                                            if(arguments[0][index[0]][0] === arguments[5][index[5]][0]){
                                                                arrayMix.push([
                                                                    arguments[0][index[0]][0],
                                                                    arguments[0][index[0]][1],
                                                                    arguments[0][index[0]][2],
                                                                    arguments[1][index[1]][2],
                                                                    arguments[2][index[2]][2],
                                                                    arguments[3][index[3]][2],
                                                                    arguments[4][index[4]][2],
                                                                    arguments[5][index[5]][2]
                                                                ]);
                                                                break;
                                                            }
                                                        }
                                                    }else{
                                                        arrayMix.push([
                                                            arguments[0][index[0]][0],
                                                            arguments[0][index[0]][1],
                                                            arguments[0][index[0]][2],
                                                            arguments[1][index[1]][2],
                                                            arguments[2][index[2]][2],
                                                            arguments[3][index[3]][2],
                                                            arguments[4][index[4]][2]
                                                            ]);
                                                        break;
                                                    }
                                                    break;
                                                }else{

                                                }
                                            }
                                        }else{
                                            arrayMix.push([
                                                arguments[0][index[0]][0],
                                                arguments[0][index[0]][1],
                                                arguments[0][index[0]][2],
                                                arguments[1][index[1]][2],
                                                arguments[2][index[2]][2],
                                                arguments[3][index[3]][2]
                                            ]);
                                        }
                                        break;
                                    }else{

                                    }
                                }
                            }else{
                                arrayMix.push([
                                    arguments[0][index[0]][0],
                                    arguments[0][index[0]][1],
                                    arguments[0][index[0]][2],
                                    arguments[1][index[1]][2],
                                    arguments[2][index[2]][2]
                                ]);
                            }
                            break;
                        }else{

                        }
                    }
                }else{
                    arrayMix.push([
                        arguments[0][index[0]][0],
                        arguments[0][index[0]][1],
                        arguments[0][index[0]][2],
                        arguments[1][index[1]][2]
                    ]);
                }
                break;
            }
        }
    }

    //console.log(maxYearRateBottom800.length);
    //console.log(maxYearRateBottom800.length);
    console.log(arrayMix.length);
}

//========================================================================================================
//========================================================================================================
var arrayMix = [];
function start(){

    async.parallel([
        function(callback){
            getCloseRate(callback);
        },

        function(callback){
            getChangeRate(callback);
        },

        function(callback){
            getContinueData(callback);
        },

        function(callback){
            getSegmentData(callback);
        },

        function(callback){
            getStableData(callback);
        },

        function(callback){
            getActivityData(callback);
        },

        function(callback){
            getExchangeRate(callback);
        }

    ], function(err, result){
        if(err){
            console.log('parallel err', err.message);
        }else{
            //mixArray(maxYearRateBottom800,maxRateBottom800);
            //mixArray(maxRateBottom800,maxYearRateBottom800,minRateBottom800,minYearRateBottom800);
            //mixArray(maxRateBottom800,maxYearRateBottom800,minRateBottom800,minYearRateBottom800);
            //mixArray(averageRateBottom800,averageYearRateBottom800);
        }

    })
}


exports.start = start;

//NO_1: minRate
exports.minRateBottom800 = minRateBottom800;
exports.minYearRateBottom800 = minYearRateBottom800;
exports.minRateTop800 = minRateTop800;
exports.minYearRateTop800 = minYearRateTop800;

    //NO_2: maxRate
exports.maxRateBottom800 = maxRateBottom800;
exports.maxYearRateBottom800 = maxYearRateBottom800;
exports.maxRateTop800 = maxRateTop800;
exports.maxYearRateTop800 = maxYearRateTop800;

    //NO_3: averageRate
exports.averageRateBottom800 = averageRateBottom800;
exports.averageYearRateBottom800 = averageYearRateBottom800;
exports.averageRateTop800 = averageRateTop800;
exports.averageYearRateTop800 = averageYearRateTop800;

    //NO_4: changeRateBottom
exports.changeWeekRateBottom800 = changeWeekRateBottom800;
exports.changeMonthRateBottom800 = changeMonthRateBottom800;
exports.changeSeasonRateBottom800 = changeSeasonRateBottom800;
exports.changeYearRateBottom800 = changeYearRateBottom800;
exports.changeTwoYearRateBottom800 = changeTwoYearRateBottom800;
exports.changeThreeYearRateBottom800 = changeThreeYearRateBottom800;
exports.changeFourYearRateBottom800 = changeFourYearRateBottom800;
exports.changeHalfYearRateBottom800 = changeHalfYearRateBottom800;

    //NO_5: changeRateTop
exports.changeWeekRateTop800 = changeWeekRateTop800;
exports.changeMonthRateTop800 = changeMonthRateTop800;
exports.changeSeasonRateTop800 = changeSeasonRateTop800;
exports.changeYearRateTop800 = changeYearRateTop800;
exports.changeTwoYearRateTop800 = changeTwoYearRateTop800;
exports.changeThreeYearRateTop800 = changeThreeYearRateTop800;
exports.changeFourYearRateTop800 = changeFourYearRateTop800;
exports.changeHalfYearRateTop800 = changeHalfYearRateTop800;

    //NO_6: continueDown
exports.continueDownTimeBottom800 = continueDownTimeBottom800;
exports.continueDownValueBottom800 = continueDownValueBottom800;
exports.continueDownTimeTop800 = continueDownTimeTop800;
exports.continueDownValueTop800 = continueDownValueTop800;

    //NO_7: continueUp
exports.continueUpTimeBottom800 = continueUpTimeBottom800;
exports.continueUpValueBottom800 = continueUpValueBottom800;
exports.continueUpTimeTop800 = continueUpTimeTop800;
exports.continueUpValueTop800 = continueUpValueTop800;

    //NO_8: segmentRateBottom
exports.segmentDownRateBottom800 = segmentDownRateBottom800;
exports.segmentDownGoalBottom800 = segmentDownGoalBottom800;
exports.segmentDownDaysBottom800 = segmentDownDaysBottom800;
exports.segmentUpRateBottom800 = segmentUpRateBottom800;
exports.segmentUpGoalBottom800 = segmentUpGoalBottom800;
exports.segmentUpDaysBottom800 = segmentUpDaysBottom800;

    //NO_9: segmentRateTop
exports.segmentDownRateTop800 = segmentDownRateTop800;
exports.segmentDownGoalTop800 = segmentDownGoalTop800;
exports.segmentDownDaysTop800 = segmentDownDaysTop800;
exports.segmentUpRateTop800 = segmentUpRateTop800;
exports.segmentUpGoalTop800 = segmentUpGoalTop800;
exports.segmentUpDaysTop800 = segmentUpDaysTop800;

    //NO_10: stableBottom
exports.stableMonthGaolBottom800 = stableMonthGaolBottom800;
exports.stableSeasonGaolBottom800 = stableSeasonGaolBottom800;
exports.stableHalfYearGaolBottom800 = stableHalfYearGaolBottom800;
exports.stableTwoYearGaolBottom800 = stableTwoYearGaolBottom800;
exports.stableThreeYearGaolBottom800 = stableThreeYearGaolBottom800;
exports.stableFourYearGaolBottom800 = stableFourYearGaolBottom800;

    //NO_11: stableTop
exports.stableMonthGaolTop800 = stableMonthGaolTop800;
exports.stableSeasonGaolTop800 = stableSeasonGaolTop800;
exports.stableHalfYearGaolTop800 = stableHalfYearGaolTop800;
exports.stableTwoYearGaolTop800 = stableTwoYearGaolTop800;
exports.stableThreeYearGaolTop800 = stableThreeYearGaolTop800;
exports.stableFourYearGaolTop800 = stableFourYearGaolTop800;

    //NO_12: activityBottom
exports.activityMonthGaolBottom800 = activityMonthGaolBottom800;
exports.activitySeasonGaolBottom800 = activitySeasonGaolBottom800;
exports.activityHalfYearGaolBottom800 = activityHalfYearGaolBottom800;
exports.activityTwoYearGaolBottom800 = activityTwoYearGaolBottom800;
exports.activityThreeYearGaolBottom800 = activityThreeYearGaolBottom800;
exports.activityFourYearGaolBottom800 = activityFourYearGaolBottom800;

    //NO_13: activityTop
exports.activityMonthGaolTop800 = activityMonthGaolTop800;
exports.activitySeasonGaolTop800 = activitySeasonGaolTop800;
exports.activityHalfYearGaolTop800 = activityHalfYearGaolTop800;
exports.activityTwoYearGaolTop800 = activityTwoYearGaolTop800;
exports.activityThreeYearGaolTop800 = activityThreeYearGaolTop800;
exports.activityFourYearGaolTop800 = activityFourYearGaolTop800;

    //NO_14: exchangeBottom
exports.exchangeWeekRateBottom800 = exchangeWeekRateBottom800;
exports.exchangeMonthRateBottom800 = exchangeMonthRateBottom800;
exports.exchangeSeasonRateBottom800 = exchangeSeasonRateBottom800;
exports.exchangeYearRateBottom800 = exchangeYearRateBottom800;
exports.exchangeTwoYearRateBottom800 = exchangeTwoYearRateBottom800;
exports.exchangeThreeYearRateBottom800 = exchangeThreeYearRateBottom800;
exports.exchangeFourYearRateBottom800 = exchangeFourYearRateBottom800;

    //NO_15: exchangeTop
exports.exchangeWeekRateTop800 = exchangeWeekRateTop800;
exports.exchangeMonthRateTop800 = exchangeMonthRateTop800;
exports.exchangeSeasonRateTop800 = exchangeSeasonRateTop800;
exports.exchangeYearRateTop800 = exchangeYearRateTop800;
exports.exchangeTwoYearRateTop800 = exchangeTwoYearRateTop800;
exports.exchangeThreeYearRateTop800 = exchangeThreeYearRateTop800;
exports.exchangeFourYearRateTop800 = exchangeFourYearRateTop800;