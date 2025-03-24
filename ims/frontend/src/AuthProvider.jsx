import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate(); 

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 < Date.now()) {
          handleLogout();
        } else {
          setUser({
            id: decodedToken.id,
            username: decodedToken.username,
            account_level: decodedToken.account_level, 
          });
        }
      } catch {
        handleLogout();
      }
    }
  }, [token]);

  const handleLogin = (user, token) => {
    const decodedToken = jwtDecode(token);
    setUser({
      id: decodedToken.id,
      username: decodedToken.username,
      account_level: decodedToken.account_level,
    });
    setToken(token);
    localStorage.setItem("token", token);
    navigate("/profile");
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, token, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};