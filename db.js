const mysql = require('mysql2');

// Create MySQL connection pool for better performance
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'camprix',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Get a connection from the pool
const db = pool.promise();

// Test the connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
    console.log('Make sure MySQL is running and the database exists.');
    return;
  }

  console.log('Connected to MySQL database: camprix');
  connection.release();
});

// Export the database connection
module.exports = db;