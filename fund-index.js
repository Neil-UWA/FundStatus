var cheerio = require('cheerio'),
    request = require('request'),
    async = require('async'),
    util = require('util');

var fundYesterday,
    _fundURL = 'http://fund.eastmoney.com/%s.html',
    fundLists = Array.prototype.slice.call(process.argv, 2);

var getFundStatus = function(fundCode){
  request.get(util.format(_fundURL, fundCode), function(err, res, body){
    var $ = cheerio.load(body);
    var realTimeFundIndex = parseFloat($('#statuspzgz').children().first().text());
    console.log(fundCode + " | " + realTimeFundIndex + " | "+ _downOrUp(realTimeFundIndex));
  });

  _downOrUp = function(realTimeFundIndex){
    return ((realTimeFundIndex - fundYesterday)/fundYesterday*100).toPrecision(4) + "%";
  };
};

var getNetFund = function(fundCode){
  request.get(util.format(_fundURL, fundCode), function(err, res, body){
    var $ = cheerio.load(body);
    fundYesterday = parseFloat($('.left12').children().first().text());
    console.log("%s 昨日净值：%s", fundCode, fundYesterday);
  });
};

function run(fundCode, callback){
  setImmediate(getNetFund,fundCode);
  setImmediate(getFundStatus,fundCode);
  setInterval(getFundStatus, 1000*60, fundCode);
};

async.each(fundLists, run, function(err){});
