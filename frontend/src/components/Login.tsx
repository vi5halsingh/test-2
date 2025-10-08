import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { login: doLogin } = useContext(AuthContext);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await doLogin(email, password);
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <h2 style={{textAlign:'center',marginBottom:16}}>Login</h2>
        {error && (
          <p style={{background:'#dc2626',color:'#fff',padding:10,borderRadius:8,marginBottom:12,textAlign:'center'}}>{error}</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label className="form-label">Email Address</label>
            <input className="form-input" id="email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="you@example.com" />
          </div>
          <div className="form-row">
            <label className="form-label">Password</label>
            <input className="form-input" id="password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="password" />
          </div>
          <button type="submit" className="btn btn-primary" style={{width:'100%'}}>Login</button>
        </form>
        <p style={{textAlign:'center',marginTop:12}}>
          Don't have an account? <Link to="/register" className="nav-link">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
