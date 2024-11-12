// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/authRoutes');
const stockRoutes = require('./routes/stockRoutes');

app.use(express.json());
app.use(cors());
app.use('/api/auth', authRoutes);
app.use('/api', stockRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
