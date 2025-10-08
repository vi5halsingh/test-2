import { Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import NewsList from './components/NewsList';
import CreateNews from './components/CreateNews';
import UpdateNews from './components/UpdateNews';

function App() {
  return (
    <div className="bg-slate-900 text-white min-h-screen">
      <header className="bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <nav className="flex justify-between items-center">
            <Link to="/" className="text-3xl font-bold tracking-tight text-white">
              News App
            </Link>
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-white hover:text-gray-200 font-semibold transition duration-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white font-bold py-2 px-6 rounded-full shadow-lg transform hover:scale-105 transition duration-300"
              >
                Register
              </Link>
            </div>
          </nav>
        </div>
      </header>
      <main className="container mx-auto p-6 mt-10">
        <Routes>
          <Route path="/" element={<NewsList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create-news" element={<CreateNews />} />
          <Route path="/update-news/:id" element={<UpdateNews />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;