import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import '../styles/report.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export default function Report() {
  const [product, setProduct] = useState('');
  const [details, setDetails] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reports, setReports] = useState([]);
  const [status, setStatus] = useState('Checking authentication...');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Check authentication and fetch products on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const r = await fetch(`${API_URL}/api/me`, { credentials: 'include' });
        const j = await r.json();
        if (!j.user) {
          const next = encodeURIComponent('/report');
          window.location.href = `/login?next=${next}`;
          return;
        }
        setUser(j.user);
        setStatus(`Signed in as ${j.user.name}`);
        setLoading(false);
        loadReports();
        fetchProducts();
      } catch (err) {
        console.error(err);
        setStatus('Unable to check authentication.');
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/api/products`);
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleProductChange = (e) => {
    const value = e.target.value;
    setProduct(value);

    if (value.trim().length > 0) {
      const filtered = products.filter((p) =>
        p.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredProducts(filtered);
      setShowDropdown(true);
    } else {
      setFilteredProducts([]);
      setShowDropdown(false);
    }
  };

  const selectProduct = (productName) => {
    setProduct(productName);
    setFilteredProducts([]);
    setShowDropdown(false);
  };

  const loadReports = async () => {
    try {
      const r = await fetch(`${API_URL}/api/reports`, { credentials: 'include' });
      if (r.status === 401) {
        window.location.href = `/login?next=${encodeURIComponent('/report')}`;
        return;
      }
      const j = await r.json();
      if (!j.reports || !j.reports.length) {
        setReports([]);
      } else {
        setReports(j.reports);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const escapeHtml = (s) => {
    return String(s).replace(/[&<>"']/g, (c) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }[c]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productTrimmed = product.trim();
    const detailsTrimmed = details.trim();

    if (!productTrimmed || !detailsTrimmed) {
      alert('Please complete all required fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(`${API_URL}/api/report`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ product: productTrimmed, details: detailsTrimmed }),
      });
      if (res.status === 401) {
        window.location.href = `/login?next=${encodeURIComponent('/report')}`;
        return;
      }
      const j = await res.json();
      if (j.ok) {
        alert('✓ Report submitted successfully. Thank you!');
        setProduct('');
        setDetails('');
        setLocation('');
        setPrice('');
        loadReports();
      } else {
        alert('Error submitting report.');
      }
    } catch (err) {
      console.error(err);
      alert('Network error.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="report-wrapper">
        <div className="report-container">
          <div className="report-header">
            <h2>🚨 Report Overpricing</h2>
          </div>
          <div className="info">{status}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="report-wrapper">
      <div className="report-container">
        <div className="report-header">
          <h2>🚨 Report Overpricing</h2>
          <p className="header-subtitle">Help us keep prices fair for everyone</p>
        </div>
        <div className="user-info">{status}</div>

        {user && (
          <>
            <form onSubmit={handleSubmit} className="report-form">
              {/* Product Selection with Autocomplete */}
              <div className="form-group">
                <label htmlFor="product">
                  <span className="label-icon">📦</span> Product or Service <span className="required">*</span>
                </label>
                <div className="product-autocomplete">
                  <input
                    id="product"
                    type="text"
                    placeholder="Type a product name..."
                    value={product}
                    onChange={handleProductChange}
                    onFocus={() => product.trim().length > 0 && setShowDropdown(true)}
                    className="product-input"
                    required
                  />
                  {showDropdown && filteredProducts.length > 0 && (
                    <div className="dropdown-list">
                      {filteredProducts.slice(0, 6).map((p, idx) => (
                        <div
                          key={idx}
                          className="dropdown-item"
                          onClick={() => selectProduct(p.name)}
                        >
                          <div className="item-name">{p.name}</div>
                          <div className="item-meta">{p.category} • {p.unit}</div>
                        </div>
                      ))}
                    </div>
                  )}
                  {showDropdown && product.trim().length > 0 && filteredProducts.length === 0 && (
                    <div className="dropdown-empty">No products found</div>
                  )}
                </div>
              </div>

              {/* Location */}
              <div className="form-group">
                <label htmlFor="location">
                  <span className="label-icon">📍</span> Location 
                </label>
                <input
                  id="location"
                  type="text"
                  placeholder="e.g., Market Center, Downtown Store"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="form-input"
                />
              </div>

              {/* Price (Optional) */}
              <div className="form-group">
                <label htmlFor="price">
                  <span className="label-icon">💰</span> Reported Price
                </label>
                <div className="price-input-group">
                  <span className="currency">x</span>
                  <input
                    id="price"
                    type="number"
                    placeholder="Amount"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    step="0.01"
                    min="0"
                    className="form-input price-input"
                  />
                </div>
              </div>

              {/* Details */}
              <div className="form-group">
                <label htmlFor="details">
                  <span className="label-icon">📝</span> Details <span className="required">*</span>
                </label>
                <textarea
                  id="details"
                  placeholder="Describe why you think the price is unfair. Include relevant details like store name, date, or comparison prices."
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className="form-textarea"
                  rows="5"
                  required
                />
                <div className="char-count">{details.length}/500</div>
              </div>

              <div className="actions">
                <button className="primary-btn" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? '⏳ Submitting...' : '✓ Submit Report'}
                </button>
              </div>
            </form>

            {/* Reports History */}
            <div className="reports-section">
              <h3>📋 Your Reports</h3>
              <div className="reports-list">
                {reports.length === 0 ? (
                  <div className="empty-state">
                    <p>No reports yet. Help us keep prices fair!</p>
                  </div>
                ) : (
                  reports.map((rep, idx) => (
                    <div key={idx} className="report-item">
                      <div className="report-product">
                        <span className="product-badge">📦</span>
                        <strong>{escapeHtml(rep.product)}</strong>
                      </div>
                      <div className="report-details">{escapeHtml(rep.details)}</div>
                      <div className="report-timestamp">
                        📅 {new Date(rep.created_at).toLocaleString()}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
