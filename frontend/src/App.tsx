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
    <div className="bg-slate-900 text-white min-h-screen">
      <header className="bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <nav className="flex justify-between items-center">
            <Link to="/" className="text-3xl font-bold tracking-tight text-white">
              News App
            </Link>
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  {user.role === 'admin' && (
                    <Link to="/create-news" className="text-white font-semibold">
                      Admin
                    </Link>
                  )}
                  <button onClick={() => { logout(); navigate('/login'); }} className="text-white">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-white hover:text-gray-200 font-semibold transition duration-300">
                    Login
                  </Link>
                  <Link to="/register" className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-bold py-2 px-6 rounded-full shadow-lg transform hover:scale-105 transition duration-300">
                    Register
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      </header>
      <main className="container mx-auto p-6 mt-10">
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
