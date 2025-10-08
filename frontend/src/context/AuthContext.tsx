import { createContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import * as api from '../services/api';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string, role?: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('auth');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUser(parsed.user);
        setToken(parsed.token);
        api.setAuthToken(parsed.token);
      } catch (e) {
        console.error('Failed to parse auth from storage', e);
      }
    }
  }, []);

  const persist = (user: User, token: string) => {
    setUser(user);
    setToken(token);
    localStorage.setItem('auth', JSON.stringify({ user, token }));
    api.setAuthToken(token);
  };

  const login = async (email: string, password: string) => {
    const res = await api.login(email, password);
    const payload = res.data;
    if (payload && payload.user) {
      persist(payload.user, payload.token);
      navigate('/');
    }
  };

  const register = async (username: string, email: string, password: string, role = 'user') => {
    const res = await api.register(username, email, password, role);
    const payload = res.data;
    if (payload && payload.user) {
      persist(payload.user, payload.token);
      navigate('/');
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('auth');
    api.setAuthToken(null);
    // Optionally remove cookie at backend later
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
