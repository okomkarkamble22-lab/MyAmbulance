// Holds future authentication state for the component tree.
import { createContext, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => (
  <AuthContext.Provider value={{ user: null }}>
    {children}
  </AuthContext.Provider>
);

export const useAuth = () => useContext(AuthContext);
