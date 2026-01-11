const fs = require('fs');
const db = require('./db');

const sql = fs.readFileSync('setup.sql', 'utf8');

// Split the SQL file into individual statements
const statements = sql.split(';').filter(stmt => stmt.trim().length > 0);

async function runSetup() {
  for (const statement of statements) {
    if (statement.trim()) {
      try {
        await db.execute(statement);
        console.log('Executed:', statement.substring(0, 50) + '...');
      } catch (error) {
        console.error('Error executing statement:', error.message);
      }
    }
  }
  console.log('Setup complete');
  process.exit(0);
}

runSetup();