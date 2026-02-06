require('dotenv').config();
const mysql = require('mysql2');

// Read DB connection info from environment with sensible defaults
const DB_HOST = process.env.DB_HOST || 'mysql'; // 'localhost' for local dev, 'mysql' for Docker
const DB_USER = process.env.DB_USER || 'root';
const DB_PASS = process.env.DB_PASS || '';
const DB_NAME = process.env.DB_NAME || 'camprix';
const DB_CONN_LIMIT = parseInt(process.env.DB_CONN_LIMIT || '10', 10);

// Create MySQL connection pool
const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: DB_CONN_LIMIT,
  queueLimit: 0
});

// Promise wrapper
const db = pool.promise();

// Test the connection once on startup
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
    console.log('Make sure MySQL is running and the database exists.');
    return;
  }

  console.log(`Connected to MySQL database: ${DB_NAME} at ${DB_HOST}`);
  connection.release();
});

module.exports = db;
