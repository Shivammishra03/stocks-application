const express = require('express');
const router = express.Router();
const { getStocks, getTopStocks } = require('../controllers/stockController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.get('/stocks', authMiddleware, getStocks);
router.get('/stocks/top', authMiddleware, getTopStocks);

module.exports = router;
