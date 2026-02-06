const bcrypt = require('bcrypt');
const db = require('./db');

async function createAdmin() {
  try {
    // Password to hash
    const password = 'admin123';
    
    // Generate bcrypt hash
    const hash = await bcrypt.hash(password, 10);
    
    console.log('Generated bcrypt hash for "admin123":', hash);
    
    // Insert or update admin user
    const [result] = await db.execute(
      'INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE password_hash = ?, role = ?',
      ['Admin User', 'admin@example.com', hash, 'admin', hash, 'admin']
    );
    
    console.log('Admin user created successfully!');
    console.log('Email: admin@example.com');
    console.log('Password: admin123');
    console.log('\nYou can now login with these credentials.');
    
    process.exit(0);
  } catch (err) {
    console.error('Error creating admin user:', err.message);
    process.exit(1);
  }
}

createAdmin();
