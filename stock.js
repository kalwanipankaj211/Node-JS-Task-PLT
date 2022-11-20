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
            this.newStocks = [...this.newStocks , ...arr];
            return this.newStocks;
        }
        catch (e) {
            console.log("error in getting lates stocks", stocks);
            return e;
        }
    }

    // filter transaction not present in stocks
    getUniqueTransactions(){
        const results = this.transactions.filter((item) => !this.currentStocks.some((stockUnit) => stockUnit.sku === item.sku));
        let uniqueTransactions = [];
        for(let transaction of results){
            uniqueTransactions.push({sku : transaction.sku, stock : 0});
        }
        var jsonObject = uniqueTransactions.map(JSON.stringify);
        var uniqueSet = new Set(jsonObject);
        var uniqueArray = Array.from(uniqueSet).map(JSON.parse);

        return uniqueArray;
    }
}

module.exports = StockService;
