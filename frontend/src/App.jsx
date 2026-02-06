import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Report from './pages/Report';
import Admin from './pages/Admin';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

console.log('=== App.jsx loaded ===');
console.log('API_URL:', API_URL);
console.log('import.meta.env:', import.meta.env);

function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('Checking auth with:', `${API_URL}/api/me`);
        const res = await fetch(`${API_URL}/api/me`, { credentials: 'include' });
        const data = await res.json();
        console.log('Auth check response:', data);
        setIsAuthenticated(!!data.user);
      } catch (err) {
        console.error('Auth check error:', err);
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" />;
  return children;
}

function App() {
  console.log('App component rendering');
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/report" element={<ProtectedRoute><Report /></ProtectedRoute>} />
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
