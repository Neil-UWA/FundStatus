var Fund      = require('./fund-index'),
    async     = require('async'),
    fundLists = process.argv.slice(2) !== [] ? process.argv.slice(2) : ['161024'];

function run(fundCode, callback){
  var fund = new Fund(fundCode);
  try{
    fund.getYesterdayFund();
    fund.getFundStatus();
    setInterval(function(){ fund.getFundStatus() }, 1000*60);
  } catch(e){
    console.error(e);
  }
};

async.each(fundLists, run, console.error);
