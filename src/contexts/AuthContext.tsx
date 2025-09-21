import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  userId: string | null;
  login: (userId: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const USER_ID_KEY = 'announcement_app_user_id';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing user ID in localStorage on initial load
    const storedUserId = localStorage.getItem(USER_ID_KEY);
    if (storedUserId) {
      setUserId(storedUserId);
    }
    setIsLoading(false);
  }, []);

  const login = (id: string) => {
    localStorage.setItem(USER_ID_KEY, id);
    setUserId(id);
  };

  const logout = () => {
    localStorage.removeItem(USER_ID_KEY);
    setUserId(null);
  };

  const value = {
    isAuthenticated: !!userId,
    userId,
    login,
    logout,
  };

  if (isLoading) {
    return <div>Loading...</div>; // Or a proper loading spinner
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
