import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import NewsList from './components/NewsList';
import Home from './components/Home';
import CreateNews from './components/CreateNews';
import UpdateNews from './components/UpdateNews';
import AdminDashboard from './components/AdminDashboard';
import { AuthProvider, AuthContext } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function AppInner() {
  const { user, logout } = React.useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div>
      <header className="header">
        <div className="container header-inner">
          <Link to="/" className="brand">News App</Link>
          <div className="nav-links">
            {user ? (
              <>
                {user.role === 'admin' && (
                  <Link to="/create-news" className="nav-link">Admin</Link>
                )}
                <button onClick={() => { logout(); navigate('/login'); }} className="nav-link">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link">Login</Link>
                <Link to="/register" className="btn btn-primary">Register</Link>
              </>
            )}
          </div>
        </div>
      </header>
      <main className="main container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<NewsList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create-news" element={<ProtectedRoute adminOnly={true}><CreateNews /></ProtectedRoute>} />
          <Route path="/update-news/:id" element={<ProtectedRoute adminOnly={true}><UpdateNews /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute adminOnly={true}><AdminDashboard /></ProtectedRoute>} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  );
}

export default App;
