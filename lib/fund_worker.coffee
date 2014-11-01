Fund      = require('./fund')

class FundWorker
  constructor: (fundCode)->
    @fund = new Fund(fundCode)

  worker: (callback)->
      @fund.getYesterdayFund()
      @fund.getFundStatus()
      setInterval((=> @fund.getFundStatus()), 1000*60)

module.exports = FundWorker
