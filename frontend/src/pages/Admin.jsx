import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/admin.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export default function Admin() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    unit: '',
    category: 'Food'
  });

  useEffect(() => {
    checkAdmin();
    fetchProducts();
  }, []);

  const checkAdmin = async () => {
    try {
      const res = await fetch(`${API_URL}/api/me`, { credentials: 'include' });
      const data = await res.json();
      if (!data.user || data.user.role !== 'admin') {
        navigate('/');
        return;
      }
      setUser(data.user);
    } catch (err) {
      console.error(err);
      navigate('/');
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_URL}/api/products`);
      const data = await res.json();
      if (data.products) setProducts(data.products);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching products:', err);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        const res = await fetch(`${API_URL}/api/products/${editingProduct.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(formData)
        });
        if (res.ok) {
          alert('Product updated successfully');
        }
      } else {
        const res = await fetch(`${API_URL}/api/products`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(formData)
        });
        if (res.ok) {
          alert('Product added successfully');
        }
      }
      setFormData({ name: '', price: '', unit: '', category: 'Food' });
      setEditingProduct(null);
      setShowForm(false);
      fetchProducts();
    } catch (err) {
      console.error('Error saving product:', err);
      alert('Error saving product');
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      unit: product.unit,
      category: product.category
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await fetch(`${API_URL}/api/products/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (res.ok) {
        alert('Product deleted successfully');
        fetchProducts();
      }
    } catch (err) {
      console.error('Error deleting product:', err);
      alert('Error deleting product');
    }
  };

  const handleLogout = async () => {
    try {
      await fetch(`${API_URL}/api/logout`, { method: 'POST', credentials: 'include' });
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="admin-wrapper">
      <div className="admin-navbar">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold' }}>CAMPRIX ADMIN</div>
          <div>
            <span style={{ marginRight: '20px' }}>Hello, {user?.name}</span>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>

      <div className="admin-container">
        <div className="admin-header">
          <h1>Manage Products</h1>
          <button 
            className="add-btn" 
            onClick={() => {
              setEditingProduct(null);
              setFormData({ name: '', price: '', unit: '', category: 'Food' });
              setShowForm(!showForm);
            }}
          >
            {showForm ? 'Cancel' : '+ Add New Product'}
          </button>
        </div>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search products by name or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          {searchQuery && (
            <button 
              className="clear-search-btn" 
              onClick={() => setSearchQuery('')}
            >
              Clear
            </button>
          )}
        </div>

        {showForm && (
          <div className="form-container">
            <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Rice (Local)"
                />
              </div>

              <div className="form-group">
                <label>Price</label>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., 850 XAF"
                />
              </div>

              <div className="form-group">
                <label>Unit</label>
                <input
                  type="text"
                  name="unit"
                  value={formData.unit}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., per kg"
                />
              </div>

              <div className="form-group">
                <label>Category</label>
                <select name="category" value={formData.category} onChange={handleInputChange}>
                  <option value="Food">Food</option>
                  <option value="Fuel">Fuel</option>
                  <option value="Construction">Construction</option>
                </select>
              </div>

              <button type="submit" className="submit-btn">
                {editingProduct ? 'Update Product' : 'Add Product'}
              </button>
            </form>
          </div>
        )}

        <div className="products-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Unit</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products
                .filter(product => 
                  product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  product.price.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map(product => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.unit}</td>
                  <td>{product.category}</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(product)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(product.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="product-stats">
          <h3>Product Statistics</h3>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">{products.length}</div>
              <div className="stat-label">Total Products</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{products.filter(p => p.category === 'Food').length}</div>
              <div className="stat-label">Food Products</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{products.filter(p => p.category === 'Fuel').length}</div>
              <div className="stat-label">Fuel Products</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{products.filter(p => p.category === 'Construction').length}</div>
              <div className="stat-label">Construction Products</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
