var fetchShare  =  require('./fetch_share_name_code_date');
var fetchShareDailyFile = require('./fetch_share_daily_data_file');
var writeShareDailyDataToMySQL = require("./write_share_daily_date_to_mysql");
var fetchShareTodayData = require("./fetch_share_today_data");
var fetchShareRangeDailyData = require("./fetch_share_range_daily_data");

function start() {
    // //step 1:
     fetchShare.start();

    // //step 2:
    // fetchShareDailyFile.start();

    //step 3:
    //writeShareDailyDataToMySQL.start();

    //===================================================
    // //do this everyday(useless, be abandoned)
    // fetchShareTodayData.start();

    //when you missed down share data, do this
    //get the new data
    //fetchShareRangeDailyData.start();
}

start();