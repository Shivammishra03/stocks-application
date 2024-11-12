// insertUsers.js
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const users = [
  { username: 'user1', password: 'password1', role: 'User1' },
  { username: 'user2', password: 'password2', role: 'User2' },
  { username: 'user3', password: 'password3', role: 'User3' },
];

async function insertUsers() {
  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const query = `INSERT INTO users (username, password, role) VALUES (?, ?, ?)`;
    const values = [user.username, hashedPassword, user.role];

    connection.query(query, values, (err, result) => {
      if (err) {
        console.error('Error inserting user:', err);
      } else {
        console.log(`User ${user.username} inserted successfully.`);
      }
    });
  }
  connection.end();
}

insertUsers();
