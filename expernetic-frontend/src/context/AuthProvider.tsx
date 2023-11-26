import React, { createContext, useContext, useState } from "react";
import { getAuthToken, removeAuthToken } from "../services/AuthService";

interface AuthContextProps {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

interface Props {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: Props) => {
  const [isLoggedIn, setLoggedIn] = useState(!!getAuthToken());

  const login = () => {
    setLoggedIn(true);
  };

  const logout = () => {
    removeAuthToken();
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
