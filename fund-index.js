var cheerio = require('cheerio');
var request = require('request');

var fundToday;

var getFundStatus = function(){
  var _fundURL = 'http://fund.eastmoney.com/161024.html';

  request.get(_fundURL, function(err, res, body){
    var $ = cheerio.load(body);
    var realTimeFundIndex = parseFloat($('#statuspzgz').children().first().text());
    console.log(realTimeFundIndex + " | "+ _downOrUp(realTimeFundIndex));
  });

  _downOrUp = function(realTimeFundIndex){
    return ((realTimeFundIndex - fundToday)/fundToday*100).toPrecision(4) + "%";
  };
};

var getNetFund = function(){
  var _fullGoalURL = 'http://www.fullgoal.com.cn/funds/zhishu/161024/index.html';

  request.get(_fullGoalURL, function(err, res, body){
    var $ = cheerio.load(body);
    fundToday = parseFloat($('.baseinfo').first().children().eq(1).text().split('：')[1]);
    console.log("今日净值："+ fundToday);
  });
};

getNetFund();
getFundStatus();
setInterval(getFundStatus, 1000*60);

