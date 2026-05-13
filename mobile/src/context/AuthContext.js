import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // In a real app, you would load the JWT from AsyncStorage here
  useEffect(() => {
    setLoading(false);
  }, []);

  const login = async (phone, otp) => {
    try {
      // Allow any 6-digit OTP as requested by the user
      if (otp && otp.length === 6) {
        // Mocking user role, assume consumer unless registered as farmer
        const mockUser = {
          userId: 'mock-user-123',
          phone,
          role: 'consumer', // Default to consumer
        };
        setUser(mockUser);
        return { success: true };
      } else {
        return { success: false, error: 'Invalid OTP. Use any 6-digit code.' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Network error during login' };
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
