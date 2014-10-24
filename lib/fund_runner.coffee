FundWorker= require('./fund_worker')
_         = require('lodash')
async     = require('async')

class FundRunner
  constructor: ->@fundLists = @getFundLists()

  getFundLists: ->
    if _.isEmpty(process.argv.slice(2))
      ['161024']
    else
      process.argv.slice(2)

  run: ->
    async.each @fundLists, (fundCode, callback)->
      fundWorker = new FundWorker(fundCode)
      fundWorker.worker(callback)
    , console.error

module.exports = FundRunner
