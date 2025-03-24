import React from "react";
import CustomNavbar from "./Navbar.jsx";

function Home({ onShowAuth }) {
  return (
    <div>
      <CustomNavbar onLoginClick={onShowAuth} />
      <div className="container-custom">
        <h1>Welcome to the Invoice Management System</h1>
        <p>This is the home page. Please log in to access your account.</p>
      </div>
    </div>
  );
}

export default Home;