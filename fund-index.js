var cheerio   = require('cheerio'),
    request   = require('request'),
    async     = require('async'),
    util      = require('util'),
    baseURL   = 'http://fund.eastmoney.com/%s.html',
    fundLists = process.argv.slice(2) == [] ? process.argv.slice(2) : ['161024'];

var Fund = function(fundCode){
  this.fundCode = fundCode;
  this.fundURL = util.format(baseURL, fundCode);
  this.fundYesterday = 0.0;
};

Fund.prototype.getYesterdayFund = function(){
  var _this = this;
  request.get(this.fundURL, function(err, res, body){
    var $ = cheerio.load(body);
    _this.fundYesterday = parseFloat($('.left12').children().first().text());
    console.log("%s 昨日净值：%s", _this.fundCode, _this.fundYesterday);
  });
};

Fund.prototype.getFundStatus = function(){
  var _this = this;
  request.get(this.fundURL, function(err, res, body){
    var $ = cheerio.load(body);
    var realTimeFundIndex = parseFloat($('#statuspzgz').children().first().text());
    console.log(_this.fundCode + " | " + realTimeFundIndex + " | "+ _downOrUp(realTimeFundIndex));
  });

  _downOrUp = function(realTimeFundIndex){
    return ((realTimeFundIndex - this.fundYesterday)/this.fundYesterday*100).toPrecision(4) + "%";
  };
};

function run(fundCode, callback){
  var fund = new Fund(fundCode);
  fund.getYesterdayFund();
  setInterval(fund.getFundStatus, 1000);
};

async.each(fundLists, run, console.error);
