const db = require('../config/db');

const getStockData = (startDate, endDate, role) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT symbol, price, date
      FROM stocks
      WHERE date BETWEEN ? AND ?
      ORDER BY date ASC;
    `;
    db.query(query, [startDate, endDate], (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

const getTopNStocks = (startDate, endDate, n, role) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT symbol, MAX(price) AS max_price
      FROM stocks
      WHERE date BETWEEN ? AND ?
      GROUP BY symbol
      ORDER BY max_price DESC
      LIMIT ?;
    `;
    db.query(query, [startDate, endDate, n], (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

module.exports = { getStockData, getTopNStocks };
