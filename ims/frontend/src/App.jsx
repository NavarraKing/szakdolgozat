import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import CustomNavbar from "./Navbar.jsx";
import AppRoutes from "./Routes.jsx";
import { AuthProvider } from "./AuthProvider.jsx";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div>
          <CustomNavbar />
          <div className="main-content">
            <AppRoutes />
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;