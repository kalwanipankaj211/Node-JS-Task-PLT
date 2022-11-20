var stocks = require('./stock.json');
var transactionService = require('./transaction.js');
var transactions = require('./transactions.json');
var service = new transactionService();
class StockService {
    constructor() {
        this.newStocks = [];
        this.currentStocks = stocks;
        this.transactions = transactions;
    }

    // get all latest stocks after overall sell of each product
    async getLatestStocks() {
        try {
            for (let product of this.currentStocks) {
                let sold_data = await service.getTransactions(product);
                if (!(sold_data instanceof Error)) {
                    product.stock = product.stock + sold_data.quantity;
                }
                this.newStocks.push(product);
            }

            //let get Unique Transactions
            let arr = this.getUniqueTransactions();
            this.newStocks = [...this.newStocks, ...arr];
            return this.newStocks;
        } catch (e) {
            console.log("error in getting lates stocks", stocks);
            return e;
        }
    }

    // filter transaction not present in stocks
    getUniqueTransactions() {
        const results = this.transactions.filter((item) => !this.currentStocks.some((stockUnit) => stockUnit.sku === item.sku));
        let uniqueTransactions = [];
        for (let transaction of results) {
            uniqueTransactions.push({ sku: transaction.sku, stock: 0 });
        }
        var jsonObject = uniqueTransactions.map(JSON.stringify);
        var uniqueSet = new Set(jsonObject);
        var uniqueArray = Array.from(uniqueSet).map(JSON.parse);

        return uniqueArray;
    }

    //sample test case function
    verifyStocks(sku) {
        const results = this.transactions.filter((item) => (item.sku === sku));
        const stock = this.currentStocks.filter((item) => item.sku === sku);
        if (results.length && !stock.length) {
            console.log(`stock doesn't exist for product sku: ${sku}`);
            return -1;
        } else if (!results.length && stock.length) {
            console.log(`stock doesn't exist for product sku: ${sku}`);
            return -1;
        }
        console.log(`product sku ${sku} have some transactions available`);
        return 1;
    }

    //test case for caculating lates stock
    calculateFinalStocks(sku) {
        const results = this.transactions.filter((item) => (item.sku === sku));
        const product = this.currentStocks.filter((item) => item.sku === sku);
        if (product.length) {
            var qty = 0;
            results.forEach((item) => {
                if (item.type === 'refund') {
                    qty = qty + item.qty;
                }
                if (item.type === 'order') {
                    qty = qty + (-item.qty);
                }
            });
            console.log(`Before Transaction stock : ${sku} , Stock:`, product[0].stock);
            product[0].stock = product[0].stock + qty;
            let obj = { sku: sku, quantity: qty };
            console.log("transaction data::", obj);
            console.log(`final stock : ${sku} , Available Quantity:`, product[0].stock);
            return 1;
        }
        console.log(`Following product ${sku} stock is not available`);
        return -1;
    }
}

module.exports = StockService;