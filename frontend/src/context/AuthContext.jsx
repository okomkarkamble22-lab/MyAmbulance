import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import authApi from '../services/auth.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    try {
      const response = await authApi.getCurrentUser();
      setUser(response.data.data.user);
      return response.data.data.user;
    } catch {
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { refreshUser(); }, []);

  const value = useMemo(() => ({
    user,
    loading,
    isAuthenticated: Boolean(user),
    login: async (payload) => {
      const response = await authApi.login(payload);
      const nextUser = response.data.data.user;
      setUser(nextUser);
      return nextUser;
    },
    register: async (payload) => {
      const response = await authApi.register(payload);
      const nextUser = response.data.data.user;
      if (nextUser) setUser(nextUser);
      return response.data.data;
    },
    logout: async () => {
      await authApi.logout();
      setUser(null);
    },
    refreshUser,
    updateProfile: async (payload) => {
      const response = await authApi.updateProfile(payload);
      const nextUser = response.data.data.user;
      setUser(nextUser);
      return nextUser;
    }
  }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
