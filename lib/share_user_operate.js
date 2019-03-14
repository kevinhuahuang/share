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
    database : 'share_user'
});



function writeUserOptionalCode(userName,data,callback){
    var sqlSentence;

    // sqlSentence = "CREATE TABLE IF NOT EXISTS user_optional_code" +
    //         " (user_name VARCHAR(20) PRIMARY KEY, code_array VARCHAR(300))" +
    //         "charset utf8 collate utf8_general_ci;";
    // //console.log(sqlSentence);
    // connection.query(sqlSentence,function(err){
    //     if(err){
    //         console.log('ERROR: CREATE TABLE user_optional_code fail', err.message);
    //     }
    // });


    sqlSentence = "UPDATE user_optional_code  SET code_array = "+ "'" + data + "'"  +" WHERE user_name = " + "'" + userName + "'";
    //remember the '
    //console.log(sqlSentence);
    connection.query(sqlSentence,function(err){
       if(err){
           console.log('ERROR: update user_optional_code of '+ userName + ' fail',err.message);
       }
       callback(null);
    });


}


var optionalCodeArray = [];
function readUserOptionalCode(userName,callback){
    var sqlSentence;

    sqlSentence = 'SELECT code_array from user_optional_code WHERE user_name = ' + "'" + userName + "'";
    console.log(sqlSentence);
    connection.query(sqlSentence,function(err,result){
        if(err){
            console.log('ERROR: read ' + userName + ' optional code array fail', err.message);
        }else{
            //console.log(result);
            if(result.length > 0){
                var data = result[0]['code_array'];
                optionalCodeArray = data.split(',');
                console.log(optionalCodeArray);
                callback(null,optionalCodeArray);
            }
        }
    })
}


function start(){

}


exports.start = start;
exports.writeUserOptionalCode = writeUserOptionalCode;
exports.readUserOptionalCode = readUserOptionalCode;


exports.optionalCodeArray = optionalCodeArray;

















