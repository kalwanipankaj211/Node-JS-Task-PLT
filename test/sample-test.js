var stockService = require('../stock.js');
let service = new stockService();
var transactionService = require('../transaction.js');
var chai = require("chai");
var expect = chai.expect;
var mocha = require('mocha');
var describe = mocha.describe;
var it = mocha.it;
var assert = chai.assert;


describe("Verify Stock", function() {
    it("verify stock method", function() {
        const result = service.verifyStocks('DXQ324600/17/58');
        expect(result).to.equal(-1);
    });

})