import React, { useState } from "react";
import "./Home.css";
import Auth from "./Auth.js";

function Home({ onShowAuth }) {
  return (
    <div>
      <nav className="navbar-custom">
        <a className="navbar-brand" href="#">IMS</a>
        <button className="btn icon-btn" onClick={onShowAuth}>
          <img src="images/icons/login/home-login-32.png" alt="Login/Register" className="icon-img" />
        </button>
      </nav>
      <div className="container-custom">
        <h1>Welcome to the Invoice Management System</h1>
        <p>This is the home page. Please log in to access your account.</p>
      </div>
    </div>
  );
}

export default Home;