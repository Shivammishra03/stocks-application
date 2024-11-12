const db = require('../config/db');

const createUser = (username, password, role) => {
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
      [username, password, role],
      (err, results) => {
        if (err) reject(err);
        resolve(results);
      }
    );
  });
};

const findUserByUsername = (username) => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM users WHERE username = ?',
      [username],
      (err, results) => {
        if (err) reject(err);
        resolve(results);
      }
    );
  });
};

module.exports = { createUser, findUserByUsername };
