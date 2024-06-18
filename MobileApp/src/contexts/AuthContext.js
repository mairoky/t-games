import React, { createContext, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const signIn = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signin', { email, password });
      setUser(response.data);
      return true;
    } catch (error) {
      console.error('Sign In Error:', error);
      return false;
    }
  };

  const signUp = async (username, email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', { username, email, password });
      setUser(response.data);
      return true;
    } catch (error) {
      console.error('Sign Up Error:', error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
