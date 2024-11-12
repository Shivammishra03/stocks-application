// controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../config/db');

exports.login = (req, res) => {
  const { username, password } = req.body;
  const sql = `SELECT * FROM users WHERE username = ?`;

  db.query(sql, [username], async (err, result) => {
    if (err) throw err;
    if (result.length && await bcrypt.compare(password, result[0].password)) {
      const token = jwt.sign({ id: result[0].id, role: result[0].role }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).send("Invalid credentials");
    }
  });
};
