import React, { useState, useEffect } from "react";
import Auth from "./Auth.js";
import Profile from "./Profile.js";
import Products from "./Products.js";
import Home from "./Home.js";

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    if (token) {
      // Fetch user data using the token
      fetch("http://localhost:5000/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.user) {
            setUser(data.user);
          } else {
            setToken(null);
            localStorage.removeItem("token");
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setToken(null);
          localStorage.removeItem("token");
        });
    }
  }, [token]);

  const handleLogin = (user, token) => {
    setUser(user);
    setToken(token);
    localStorage.setItem("token", token);
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <div className="container mt-5">
      {!user ? (
        showAuth ? (
          <Auth onLogin={handleLogin} />
        ) : (
          <Home onShowAuth={() => setShowAuth(true)} />
        )
      ) : (
        <div>
          <h1 className="mb-4">Welcome, {user.username}</h1>
          <button className="btn btn-danger mb-4" onClick={handleLogout}>Logout</button>
          <Profile token={token} />
          <Products token={token} />
        </div>
      )}
    </div>
  );
}

export default App;