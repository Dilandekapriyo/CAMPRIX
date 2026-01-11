const http = require('node:http');
const db = require('./db');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  // Set CORS headers for frontend communication
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    res.end();
    return;
  }

  // Parse URL
  const url = new URL(req.url, `http://${req.headers.host}`);
  const path = url.pathname;

  // API endpoints for products
  if (path === '/api/products' && req.method === 'GET') {
    // Get all products
    db.execute('SELECT * FROM home_product')
      .then(([rows]) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ products: rows }));
      })
      .catch(err => {
        console.error('Database error:', err);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Database error' }));
      });
  } else if (path.startsWith('/api/products/') && req.method === 'GET') {
    // Get specific product by ID
    const productId = path.split('/')[3];
    db.execute('SELECT * FROM home_product WHERE id = ?', [productId])
      .then(([rows]) => {
        if (rows.length === 0) {
          res.statusCode = 404;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Product not found' }));
          return;
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ product: rows[0] }));
      })
      .catch(err => {
        console.error('Database error:', err);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Database error' }));
      });
  } else if (path === '/api/products' && req.method === 'POST') {
    // Create new product
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const productData = JSON.parse(body);
        db.execute('INSERT INTO home_product (name, price, description) VALUES (?, ?, ?)',
          [productData.name, productData.price, productData.description])
          .then(([result]) => {
            res.statusCode = 201;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
              message: 'Product created successfully',
              productId: result.insertId
            }));
          })
          .catch(err => {
            console.error('Database error:', err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Database error' }));
          });
      } catch (error) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
  } else {
    // Default response
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('CAMPRIX Backend API\n');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});