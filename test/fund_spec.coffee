chai    = require 'chai'
expect  = chai.expect
util    = require 'util'
sinon   = require 'sinon'
Fund    = require '../lib/fund'

describe 'Fund', ->
  beforeEach ->
    @fund = new Fund(123)

  describe 'constructor', ->
    it 'sets fund url correctly', ->
      baseURL = 'http://fund.eastmoney.com/%s.html'
      expect(@fund.fundURL).to.eql(util.format(baseURL, 123))

    it 'sets fund code correctly', ->
      expect(@fund.fundCode).to.eql(123)

    it 'has some default values', ->
      expect(@fund.fundYesterday).to.eql(0.0)
      expect(@fund.realTimeFundIndex).to.eql(0.0)
      expect(@fund.previousFundIndex).to.eql(0.0)

  describe '#getYesterdayFund', ->
    it 'should get the fund index of yesterday'

  describe '#getFundStatus', ->
    it 'should get the fund index of the current time'
