var chai    = require('chai'),
    expect  = chai.expect,
    util    = require('util'),
    sinon   = require('sinon'),
    Fund    = require('./fund-index');

describe('Fund', function(){
  beforeEach(function(){
    this.fund = new Fund(123);
  });

  describe('constructor', function(){
    it('sets fund url correctly', function(){
      var baseURL = 'http://fund.eastmoney.com/%s.html';
      expect(this.fund.fundURL).to.eql(util.format(baseURL, 123));
    });

    it('sets fund code correctly', function(){
      expect(this.fund.fundCode).to.eql(123);
    });

    it('has some default values', function(){
      expect(this.fund.fundYesterday).to.eql(0.0);
      expect(this.fund.realTimeFundIndex).to.eql(0.0);
      expect(this.fund.previousFundIndex).to.eql(0.0);
    });
  });

  describe('#getYesterdayFund', function(){
    it('should get the fund index of yesterday');
  });

  describe('#getFundStatus', function(){
    it('should get the fund index of the current time');
  });

  describe('#showFundIndex', function(){
    beforeEach(function(){
    });

    it('shows the fund index correctly');
  });

  describe('#_changed', function(){
    context('when fund index doesn\'t change', function(){
      it('returns false', function(){
        expect(this.fund._changed()).to.be.false;
      });
    });

    context('when fund index changes', function(){
      it('returns true', function(){
        this.fund.realTimeFundIndex = 1.0;
        expect(this.fund._changed()).to.be.true;
      });
    });
  });
});
