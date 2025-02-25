import React, { useState } from "react";
import "./Home.css";

function Register({ onRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(""); 
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/register", { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, email }), 
      });

      const data = await response.json();
      if (response.ok) {
        onRegister({ username }, data.token);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Error during registration");
    }
  };

  return (
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div className="card" style={{ borderRadius: "1rem" }}>
            <div className="card-body p-5 text-center">
              <div className="mb-md-5 mt-md-4 pb-5">
                <h2 className="fw-bold mb-2">Register</h2>
                <p className="mb-5">Please enter your username, email, and password!</p>
                {error && <p className="text-danger">{error}</p>}
                <form onSubmit={handleRegister}>
                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      id="typeUsernameX"
                      className="form-control form-control-lg"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Username"
                    />
                    <label className="form-label" htmlFor="typeUsernameX">Username</label>
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      id="typeEmailX"
                      className="form-control form-control-lg"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                    />
                    <label className="form-label" htmlFor="typeEmailX">Email</label>
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="typePasswordX"
                      className="form-control form-control-lg"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                    />
                    <label className="form-label" htmlFor="typePasswordX">Password</label>
                  </div>
                  <button className="btn btn-primary btn-lg px-5" type="submit">Register</button>
                </form>
              </div>
              <div>
                <p className="mb-0">Already have an account? <a href="#!" className="text-primary fw-bold" onClick={() => onRegister()}>Login</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;