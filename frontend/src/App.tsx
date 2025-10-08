import { Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import NewsList from './components/NewsList';
import CreateNews from './components/CreateNews'
import UpdateNews from './components/UpdateNews';

function App() {
  return (
    <div className="container mx-auto p-4">
      <nav className="flex justify-between items-center mb-4">
        <Link to="/" className="text-xl font-bold">News App</Link>
        <div>
          <Link to="/login" className="mr-4">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<NewsList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-news" element={<CreateNews />} />
        <Route path="/update-news/:id" element={<UpdateNews />} />
      </Routes>
    </div>
  );
}

export default App;