/**
 * BOOKCASE App - Authentication Context
 * Manages customer authentication session & token persistence.
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser, registerUser } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const savedUser = await AsyncStorage.getItem('bookcase_mobile_user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (e) {
        console.error('Session restore failed', e);
      } finally {
        setLoading(false);
      }
    };
    checkSession();
  }, []);

  const login = async (email, password) => {
    const res = await loginUser(email, password);
    if (res.success) {
      setUser(res.user);
      await AsyncStorage.setItem('bookcase_mobile_user', JSON.stringify(res.user));
    }
    return res;
  };

  const register = async (username, email, password) => {
    const res = await registerUser(username, email, password);
    if (res.success) {
      setUser(res.user);
      await AsyncStorage.setItem('bookcase_mobile_user', JSON.stringify(res.user));
    }
    return res;
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('bookcase_mobile_user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
