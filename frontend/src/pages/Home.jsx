import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/home.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [currentFilter, setCurrentFilter] = useState('All');
  const [currentSearch, setCurrentSearch] = useState('');
  const [user, setUser] = useState(null);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log('Fetching products from API...');
        const res = await fetch(`${API_URL}/api/products`);
        const data = await res.json();
        console.log('Products fetched:', data.products);
        if (data.products && Array.isArray(data.products)) {
          setProducts(data.products);
        }
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };
    fetchProducts();
  }, []);

  // Load user info
  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await fetch(`${API_URL}/api/me`, { credentials: 'include' });
        const j = await res.json();
        if (j.user) setUser(j.user);
      } catch (err) {
        console.error(err);
      }
    };
    loadUser();
  }, []);

  const filteredProducts = products
    .filter((p) => currentFilter === 'All' || (p.category && p.category.toLowerCase() === currentFilter.toLowerCase()))
    .filter((p) => p.name.toLowerCase().includes(currentSearch.toLowerCase()));

  const handleLogout = async () => {
    try {
      await fetch(`${API_URL}/api/logout`, { method: 'POST', credentials: 'include' });
      window.location.href = '/';
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="home-wrapper">
      <div className="navbar">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <div>CAMPRIX</div>
          <div id="account-area">
            {user ? (
              <div className="account-chip">
                <div className="greeting-text">Hello, {user.name}</div>
                {user.role === 'admin' && (
                  <Link to="/admin" style={{ textDecoration: 'none', color: 'white' }}>
                    <button style={{ marginRight: '10px', padding: '5px 15px', background: '#ff6b6b', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Admin</button>
                  </Link>
                )}
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
              </div>
            ) : (
              <Link to="/login" className="sign-in-link">Sign in</Link>
            )}
          </div>
        </div>
      </div>

      <div className="container">
        <div className="subtitle">National Price Tracker</div>
        <div>Last updated: <b>2026-01-15</b></div>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search a product"
            value={currentSearch}
            onChange={(e) => setCurrentSearch(e.target.value)}
          />
        </div>

        <div className="filters">
          {['All', 'Food', 'Fuel', 'Construction'].map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${currentFilter === cat ? 'active' : ''}`}
              onClick={() => setCurrentFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <Link to="/report" className="warning-btn" style={{ textDecoration: 'none', display: 'block', color: 'white' }}>
          Report Overpricing
        </Link>

        <h3 style={{ marginTop: '20px', marginBottom: '15px' }}>
          Official Prices
          <span style={{ fontSize: '14px', color: '#666', marginLeft: '10px' }}>
            ({filteredProducts.length} products)
          </span>
        </h3>

        <div className="products-grid">
          {filteredProducts.map((product, idx) => (
            <div key={idx} className="product-card">
              <div className="product-header">
                <span className="tag">{product.category}</span>
              </div>
              <div className="product-body">
                <h4 className="product-name">{product.name}</h4>
                <div className="product-unit">{product.unit}</div>
                <div className="product-price">{product.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bottom-nav">
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <button className="active">Home</button>
        </Link>
        <Link to="/report" style={{ textDecoration: 'none', color: 'inherit' }}>
          <button>Report</button>
        </Link>
        <button>Profile</button>
      </div>
    </div>
  );
}
