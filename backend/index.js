const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Enable CORS for frontend requests
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.FRONTEND_URL || 'http://localhost:5173');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

app.use(session({
  secret: process.env.SESSION_SECRET || 'dev-secret-change-me',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    httpOnly: true,
    sameSite: 'lax'
  }
}));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Signup
app.post('/api/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    // Check existing
    const [rows] = await db.execute('SELECT id FROM users WHERE email = ?', [email]);
    if (rows.length) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    const hash = await bcrypt.hash(password, 10);
    const [result] = await db.execute('INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)', [name, email, hash]);
    req.session.userId = result.insertId;
    req.session.userName = name;
    return res.json({ ok: true });
  } catch (err) {
    console.error('Signup error', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    const [rows] = await db.execute('SELECT id, password_hash, name, email FROM users WHERE email = ?', [email]);
    if (!rows.length) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const user = rows[0];
    const ok = await bcrypt.compare(password, user.password_hash || '');
    if (!ok) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    req.session.userId = user.id;
    req.session.userName = user.name;
    return res.json({ ok: true });
  } catch (err) {
    console.error('Login error', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Logout
app.post('/api/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) console.error('Session destroy error', err);
    res.json({ ok: true });
  });
});

// Get all products
app.get('/api/products', async (req, res) => {
  try {
    console.log('Getting products...');
    const [rows] = await db.execute('SELECT id, name, price, unit, cat as category, created_at FROM home_product ORDER BY id ASC');
    console.log('Products retrieved:', rows.length, rows);
    return res.json({ products: rows });
  } catch (err) {
    console.error('Get products error:', err.message, err.stack);
    return res.status(500).json({ error: 'Server error', details: err.message });
  }
});

// Return current user
app.get('/api/me', async (req, res) => {
  if (!req.session.userId) return res.json({ user: null });
  try {
    const [rows] = await db.execute('SELECT id, name, email, role, created_at FROM users WHERE id = ?', [req.session.userId]);
    if (!rows.length) return res.json({ user: null });
    return res.json({ user: rows[0] });
  } catch (err) {
    console.error('api/me error', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Middleware: protect routes
function requireAuth(req, res, next) {
  if (req.session && req.session.userId) return next();
  return res.status(401).json({ error: 'Unauthorized' });
}

// Middleware: check admin role
async function requireAdmin(req, res, next) {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const [rows] = await db.execute('SELECT role FROM users WHERE id = ?', [req.session.userId]);
    if (rows.length && rows[0].role === 'admin') {
      return next();
    }
    return res.status(403).json({ error: 'Forbidden' });
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
}

// Add new product (admin only)
app.post('/api/products', requireAdmin, async (req, res) => {
  try {
    const { name, price, unit, category } = req.body;
    if (!name || !price || !unit || !category) {
      return res.status(400).json({ error: 'Missing fields' });
    }
    const [result] = await db.execute(
      'INSERT INTO home_product (name, price, unit, cat) VALUES (?, ?, ?, ?)',
      [name, price, unit, category]
    );
    return res.json({ ok: true, id: result.insertId });
  } catch (err) {
    console.error('Add product error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Update product (admin only)
app.put('/api/products/:id', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, unit, category } = req.body;
    if (!name || !price || !unit || !category) {
      return res.status(400).json({ error: 'Missing fields' });
    }
    await db.execute(
      'UPDATE home_product SET name = ?, price = ?, unit = ?, cat = ? WHERE id = ?',
      [name, price, unit, category, id]
    );
    return res.json({ ok: true });
  } catch (err) {
    console.error('Update product error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Delete product (admin only)
app.delete('/api/products/:id', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    await db.execute('DELETE FROM home_product WHERE id = ?', [id]);
    return res.json({ ok: true });
  } catch (err) {
    console.error('Delete product error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Submit report
app.post('/api/report', requireAuth, async (req, res) => {
  try {
    const { product, details } = req.body;
    if (!product || !details) return res.status(400).json({ error: 'Missing fields' });
    const [result] = await db.execute('INSERT INTO reports (user_id, product, details) VALUES (?, ?, ?)', [req.session.userId, product, details]);
    const insertedId = result.insertId;
    const [rows] = await db.execute('SELECT id, user_id, product, details, created_at FROM reports WHERE id = ?', [insertedId]);
    return res.json({ ok: true, report: rows[0] });
  } catch (err) {
    console.error('Report save error', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Get reports for current user
app.get('/api/reports', requireAuth, async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT id, product, details, created_at FROM reports WHERE user_id = ? ORDER BY created_at DESC', [req.session.userId]);
    return res.json({ reports: rows });
  } catch (err) {
    console.error('Get reports error', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

if (require.main === module) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://127.0.0.1:${PORT}`);
  });
}

module.exports = app;
