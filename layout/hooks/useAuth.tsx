'use client';
import jwt from 'jsonwebtoken';
import { useEffect, useState } from 'react';

const useAuth = () => {
  const [token, setToken] = useState(localStorage.getItem('jwtToken') || '');
  const [user, setUser] = useState({ role: null });

  useEffect(() => {
    jwt.verify(token, 'eprocurementapp', (err: any, decoded: any) => {
      setUser(decoded);
    });
  }, [token]);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      const jwtToken = data.token;

      // Store the token in localStorage
      localStorage.setItem('jwtToken', jwtToken);

      // Set the token in state
      setToken(jwtToken);

      return jwtToken;
    } catch (error) {
      throw new Error('Login failed');
    }
  };

  const register = async (
    email: string,
    password: string,
    role: string,
    firstName: string,
    lastName: string = ''
  ) => {
    try {
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, role, firstName, lastName }),
      });

      if (!response.ok) {
        throw new Error('Register failed');
      }

      const data = await response.json();

      return data;
    } catch (error) {
      throw new Error('Register failed');
    }
  };

  const verify = async (code: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/verify/${code}`);

      console.log('🚀 ~ file: useAuth.tsx:68 ~ verify ~ response:', response);
      if (!response.ok) {
        throw new Error('Verification failed');
      }

      const data = await response.json();
      if (data.message === 'Email verification successful') {
        return true;
      }

      return false;
    } catch (error) {
      throw new Error('Verification failed');
    }
  };

  const logout = () => {
    // Remove the token from localStorage
    localStorage.removeItem('jwtToken');

    // Clear the token in state
    setToken('');
  };

  return { token, login, logout, register, verify, user };
};

export default useAuth;
