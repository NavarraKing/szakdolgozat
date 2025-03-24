import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usernameOrEmail: username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        onLogin({ username }, data.token);
        navigate("/profile"); 
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Error during login");
      console.log(err);
    }
  };

  const handleSwitchToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="container py-5 h-100 top-close">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div className="card" style={{ borderRadius: "1rem" }}>
            <div className="card-body p-5 text-center">
              <div className="mb-md-5 mt-md-4 pb-5">
                <h2 className="fw-bold mb-2">Login</h2>
                <p className="mb-5">Please enter your username or email and you password!</p>
                {error && <p className="text-danger">{error}</p>}
                <form onSubmit={handleLogin}>
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="typeEmailX">Username or Email</label>
                    <input
                      type="text"
                      id="typeEmailX"
                      className="form-control form-control-lg"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Username or Email"
                    />
                  </div>
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="typePasswordX">Password</label>
                    <input
                      type="password"
                      id="typePasswordX"
                      className="form-control form-control-lg"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                    />
                  </div>
                  <button className="btn btn-primary btn-lg px-5" type="submit">
                    Login
                  </button>
                </form>
              </div>
              <div>
                <p className="mb-0">
                  Don't have an account?{" "}
                  <a
                    href="#!"
                    className="text-primary fw-bold"
                    onClick={handleSwitchToRegister}
                  >
                    Sign Up
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;