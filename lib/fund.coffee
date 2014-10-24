cheerio   = require('cheerio')
request   = require('request')
util      = require('util')
baseURL   = 'http://fund.eastmoney.com/%s.html'

class Fund
  constructor:(@fundCode)->
    @fundURL = util.format baseURL, @fundCode
    @fundYesterday = 0.0
    @realTimeFundIndex = 0.0
    @previousFundIndex = 0.0

  getYesterdayFund:  ->
    request.get @fundURL, (err, res, body)=>
      throw new Error err if err
      $ = cheerio.load body
      @fundYesterday = parseFloat($('.left12').children().first().text())

  getFundStatus: ->
    request.get @fundURL, (err, res, body)=>
      throw new Error err if err
      $ = cheerio.load body
      @realTimeFundIndex = parseFloat($('#statuspzgz').children().first().text())
      @showFundStatus() if @realTimeFundIndex != @previousFundIndex
      @previousFundIndex = @realTimeFundIndex

  showFundStatus: ->
    console.log "%s\t昨日净值：%s", @fundCode, @fundYesterday
    console.log '\t%s | %s', @realTimeFundIndex, @_downOrUp()
    console.log "\t%s\n", new Date().toLocaleString()

  _downOrUp: ->
    ((@realTimeFundIndex - @fundYesterday)/@fundYesterday*100).toPrecision(4) + "%"

module.exports = Fund
