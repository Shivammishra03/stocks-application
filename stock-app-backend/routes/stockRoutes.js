const express = require('express');
const router = express.Router();
const { getStocks, getTopStocks } = require('../controllers/stockController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.get('/stocks', authMiddleware, getStocks);
router.get('/stocks/top', authMiddleware, getTopStocks);

router.get('/line-chart', authMiddleware, roleMiddleware('User1'), getStocks);
router.get('/bar-chart', authMiddleware, roleMiddleware('User2'), getStocks);
router.get('/pie-chart', authMiddleware, roleMiddleware('User3'), getStocks);

module.exports = router;
