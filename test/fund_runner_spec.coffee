chai    = require 'chai'
expect  = chai.expect
util    = require 'util'
sinon   = require 'sinon'
FundRunner = require '../lib/fund_runner'

describe 'FundRunner', ->
  describe 'constructor', ->
    context 'when no fund code is passed', ->
      it 'returns default fund code'

    context 'when fund codes are passed', ->
      it 'returns default fund code'
