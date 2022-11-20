// var stockService = require('./generate-latest-stocks.js');
var stockService = require('./stock.js');
var fs = require('fs');
var jsonexport = require('jsonexport');

async function start(){
    let service = new stockService();
    let data = await service.getLatestStocks();
    console.log("data::", data);
    let csv = await jsonexport(data);
    // console.log("csv data::", csv);
    fs.writeFileSync('./latest-stocks-new.json', JSON.stringify(data));
    fs.writeFileSync('./latest-stocks.csv', csv);
}

start();