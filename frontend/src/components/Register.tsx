import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { register: doRegister } = useContext(AuthContext);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await doRegister(username, email, password);
    } catch (err) {
      setError('Failed to register');
    }
  };

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <h2 style={{marginBottom:12}}>Register</h2>
        {error && <p style={{color:'#f87171'}}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label className="form-label">Username</label>
            <input className="form-input" value={username} onChange={(e)=>setUsername(e.target.value)} />
          </div>
          <div className="form-row">
            <label className="form-label">Email</label>
            <input className="form-input" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
          </div>
          <div className="form-row">
            <label className="form-label">Password</label>
            <input className="form-input" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary" style={{width:'100%'}}>Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
