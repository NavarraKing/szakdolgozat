import React, { useContext } from "react";
import CustomNavbar from "./Navbar.jsx";
import { AuthContext } from "./AuthProvider.jsx";

function Home({ onShowAuth }) {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <CustomNavbar onLoginClick={onShowAuth} />
      <div className="container-custom">
        <h1>Welcome to the Invoice Management System</h1>
        {!user && <p>This is the home page. Please log in to access your account.</p>}
      </div>
    </div>
  );
}

export default Home;