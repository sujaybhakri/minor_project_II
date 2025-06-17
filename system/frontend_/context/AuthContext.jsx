import React, { createContext, useContext, useState, useEffect } from 'react';
import { authApi } from '../services/api';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    user: null,
    isAuthenticated: false,
    loading: true
  });

  useEffect(() => {
    // Check for stored token on app load
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (token && storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setAuthState({
          user,
          isAuthenticated: true,
          loading: false
        });
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setAuthState(prev => ({ ...prev, loading: false }));
      }
    } else {
      setAuthState(prev => ({ ...prev, loading: false }));
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authApi.login({ email, password });
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      setAuthState({
        user,
        isAuthenticated: true,
        loading: false
      });
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const signup = async (name, email, password, role) => {
    try {
      const response = await authApi.register({ name, email, password, role });
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      setAuthState({
        user,
        isAuthenticated: true,
        loading: false
      });
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  };

  const logout = () => {
    authApi.logout();
    localStorage.removeItem('user');
    setAuthState({
      user: null,
      isAuthenticated: false,
      loading: false
    });
  };

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      signup,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};