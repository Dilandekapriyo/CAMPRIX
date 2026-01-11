const db = require('./db');

async function testDB() {
  try {
    const [rows] = await db.execute('SELECT * FROM home_product');
    console.log('Products in database:', rows);
  } catch (error) {
    console.error('Database error:', error);
  }
  process.exit(0);
}

testDB();