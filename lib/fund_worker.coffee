Fund      = require('./fund')

class FundWorker
  constructor: (fundCode)->
    @fund = new Fund(fundCode)

  worker: (callback)->
    try
      @fund.getYesterdayFund()
      @fund.getFundStatus()
      setInterval((=> @fund.getFundStatus()), 1000)
    catch e
      callback(e)

module.exports = FundWorker
