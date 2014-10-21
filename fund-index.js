var cheerio = require('cheerio'),
    request = require('request'),
    async = require('async'),
    util = require('util');

var _fundURL = 'http://fund.eastmoney.com/%s.html',
    fundLists = process.argv.slice(2);

var getFundStatus = function(fundCode){
  var fundYesterday;
  request.get(util.format(_fundURL, fundCode), function(err, res, body){
    var $ = cheerio.load(body);
    fundYesterday = parseFloat($('.left12').children().first().text());
    console.log("%s 昨日净值：%s", fundCode, fundYesterday);
  });

  return function(){
    request.get(util.format(_fundURL, fundCode), function(err, res, body){
      var $ = cheerio.load(body);
      var realTimeFundIndex = parseFloat($('#statuspzgz').children().first().text());
      console.log(fundCode + " | " + realTimeFundIndex + " | "+ _downOrUp(realTimeFundIndex));
    });

    _downOrUp = function(realTimeFundIndex){
      return ((realTimeFundIndex - fundYesterday)/fundYesterday*100).toPrecision(4) + "%";
    };
  }
};

function run(fundCode, callback){
  setInterval(getFundStatus(fundCode), 1000);
};

async.each(fundLists, run, console.error);
