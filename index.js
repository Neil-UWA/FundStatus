require('coffee-script/register')
var FundRunner = require('./lib/fund_runner');

var fundRunner = new FundRunner();

fundRunner.run();
