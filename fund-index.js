var cheerio   = require('cheerio'),
    request   = require('request'),
    util      = require('util'),
    baseURL   = 'http://fund.eastmoney.com/%s.html';

var Fund = function(fundCode){
  this.fundCode = fundCode;
  this.fundURL = util.format(baseURL, fundCode);
  this.fundYesterday = 0.0;
  this.realTimeFundIndex = 0.0;
  this.previousFundIndex = 0.0;
};

Fund.prototype.getYesterdayFund = function(){
  var _this = this;

  request.get(this.fundURL, function(err, res, body){
    if (err) throw new Error(e);
    var $ = cheerio.load(body);
    _this.fundYesterday = parseFloat($('.left12').children().first().text());
    console.log("%s 昨日净值：%s", _this.fundCode, _this.fundYesterday);
  });
};

Fund.prototype.getFundStatus = function(){
  var _this = this;

  request.get(this.fundURL, function(err, res, body){
    if (err) throw new Error(err);
    var $ = cheerio.load(body);
    _this.realTimeFundIndex = parseFloat($('#statuspzgz').children().first().text());
    if (_this._changed()) _this.showFundIndex();
    _this.previousFundIndex = _this.realTimeFundIndex;
  });
};

Fund.prototype.showFundIndex = function(){
  console.log("%s | %s | %s | %s", this.fundCode, this.realTimeFundIndex, this._downOrUp(), new Date().toLocaleString());
};

Fund.prototype._changed = function(){
  return this.realTimeFundIndex !== this.previousFundIndex;
};

Fund.prototype._downOrUp = function(){
  return ((this.realTimeFundIndex - this.fundYesterday)/this.fundYesterday*100).toPrecision(4) + "%";
};

module.exports = Fund;
