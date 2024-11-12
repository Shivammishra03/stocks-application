// controllers/stockController.js
const db = require('../config/db');

exports.getStocks = (req, res) => {
  const { startDate, endDate } = req.query;
  const sql = `SELECT * FROM stock_data WHERE date BETWEEN '${startDate}' AND '${endDate}'`
  
  db.query(sql, [startDate, endDate], (err, result) => {
    if (err) throw err;
    res.json(result);
  });
};

exports.getTopStocks = (req, res) => {
  const { startDate, endDate, limit } = req.query;

  const sql = `SELECT * FROM stock_data WHERE date BETWEEN '${startDate}' AND '${endDate}' ORDER BY close_price DESC LIMIT '${limit}'`;
  

  db.query(sql, [startDate, endDate, parseInt(limit)], (err, result) => {
    if (err) throw err;
    res.json(result);
  });
};
