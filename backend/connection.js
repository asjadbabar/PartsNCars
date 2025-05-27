// server/db.js
const mysql = require('mysql2');

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12341234',
  database: 'partsncars'
});

// Connect to the database
conn.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err);
    return;
  }
  console.log('Connected to MySQL database ✅');
});

module.exports = conn;
