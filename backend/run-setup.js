const fs = require('fs');
const db = require('./db');

const sql = fs.readFileSync('setup.sql', 'utf8');
const adminSql = fs.readFileSync('admin-setup.sql', 'utf8');

// Split the SQL files into individual statements
const statements = sql.split(';').filter(stmt => stmt.trim().length > 0);
const adminStatements = adminSql.split(';').filter(stmt => stmt.trim().length > 0);

async function runSetup() {
  console.log('Running main setup...');
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

  console.log('\nRunning admin setup...');
  for (const statement of adminStatements) {
    if (statement.trim()) {
      try {
        await db.execute(statement);
        console.log('Executed:', statement.substring(0, 50) + '...');
      } catch (error) {
        console.error('Error executing statement:', error.message);
      }
    }
  }

  console.log('\nSetup complete!');
  console.log('Admin credentials: email=admin@example.com, password=admin123');
  process.exit(0);
}

runSetup();

