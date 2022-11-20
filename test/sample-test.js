var stockService = require("../stock.js");
let service = new stockService();
var transactionService = require("../transaction.js");
var chai = require("chai");
var expect = chai.expect;
var mocha = require("mocha");
var describe = mocha.describe;
var it = mocha.it;
var assert = chai.assert;

describe("Verify & Get Latest Stock", function() {
    let testRan = 0;
    beforeEach(function() {
        testRan++;
        console.log("Initialising... Test " + testRan);
    });
    it("verify stock method", function() {
        const result = service.verifyStocks("DXQ324600/17/58");
        // expect(result).to.equal(1);
        assert.notStrictEqual(result, 1);
    });

    it("get latest stocks for specific product", function() {
        const result = service.calculateFinalStocks("SXB930757/87/87");
        // expect(result).to.equal(1);
        assert.strictEqual(result, 1);
    });
    var endCase = 0;
    afterEach(function() {
        endCase++
        console.log("Test Case End " + endCase);
        console.log('\n');
    });
});