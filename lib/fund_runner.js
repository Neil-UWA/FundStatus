var Fund      = require('./fund'),
    _         = require('lodash'),
    async     = require('async');

var FundRunner = function(){
  this.fundLists = _.isEmpty(process.argv.slice(2)) ? ['161024'] : process.argv.slice(2) ;
};

FundRunner.prototype.worker = function(fundCode, callback){
  var fund = new Fund(fundCode);
  try{
    fund.getYesterdayFund();
    fund.getFundStatus();
    setInterval(function(){ fund.getFundStatus() }, 1000*60);
  } catch(e){
    console.error(e);
  }
};

FundRunner.prototype.run = function(){
  async.each(this.fundLists, this.worker, console.error);
};

module.exports = FundRunner;
