import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home.jsx";
import Products from "./Products.jsx";
import Register from "./Register.jsx";
import Login from "./Login.jsx";
import Profile from "./Profile.jsx";
import ProductsManager from "./ProductsManager.jsx";
import Users from "./Users.jsx";
import UsersManager from "./UsersManager.jsx";
import { AuthContext } from "./AuthProvider.jsx";
import Seller from "./Seller.jsx";
import Receipts from "./Receipts.jsx";

function AppRoutes() {
  const { user, handleLogin } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/register" element={<Register />} />
      <Route path="/auth" element={<Login onLogin={handleLogin} />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/seller" element={<Seller />} />
      {user?.account_level === 1 && (
        <>
          <Route path="/products-manager" element={<ProductsManager />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users-manager" element={<UsersManager />} />
          <Route path="/receipts" element={<Receipts />} />
        </>
      )}
    </Routes>
  );
}

export default AppRoutes;