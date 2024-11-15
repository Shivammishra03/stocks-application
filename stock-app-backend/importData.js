const xlsx = require('xlsx');
const db = require('./config/db');

const workbook = xlsx.readFile('stock_data.xls');
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const data = xlsx.utils.sheet_to_json(sheet);

data.forEach(row => {
    // console.log("Processing row:", row);
    // const { Symbol, Date, open, high, low, close_price, adj_total_value, net_turnover, market_cap } = row;
    const {
      'SYMBOL': Symbol,
      'DATE': Date,
      'OPEN': open,
      'HIGH': high,
      'LOW': low,
      'CLOSE_PRICE': close_price,
      'ADJ TOTAL VALUE': adj_total_value,
      'NET TURNOVER': net_turnover,
      'MARKET CAP': market_cap
    } = row;
   
    console.log(`Symbol: ${Symbol}, Date: ${Date}, Open: ${open}, High: ${high}, Low: ${low}, Close: ${close_price}`);

    const sql = `INSERT INTO stock_data (symbol, date, open, high, low, close_price, adj_total_value, net_turnover, market_cap)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(sql, [Symbol, Date, open, high, low, close_price, adj_total_value, net_turnover, market_cap], (err) => {
        if (err) throw err;
    });
});

console.log("Data import attempted.");
