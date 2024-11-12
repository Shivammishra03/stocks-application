const express = require('express');
const { getStockData, getTopNStocks } = require('../controllers/chartController');
const jwt = require('jsonwebtoken');
const router = express.Router();

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).send('Token required');
  
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).send('Invalid token');
    req.user = decoded;
    next();
  });
};

router.get('/data', verifyToken, async (req, res) => {
  const { startDate, endDate } = req.query;
  
  try {
    const data = await getStockData(startDate, endDate, req.user.role);
    res.json(data);
  } catch (err) {
    res.status(500).send('Error fetching stock data');
  }
});

router.get('/top-n', verifyToken, async (req, res) => {
  const { startDate, endDate, n } = req.query;
  
  try {
    const topStocks = await getTopNStocks(startDate, endDate, n, req.user.role);
    res.json(topStocks);
  } catch (err) {
    res.status(500).send('Error fetching top stocks');
  }
});

module.exports = router;
