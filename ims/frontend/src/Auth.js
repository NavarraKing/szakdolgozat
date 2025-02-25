import React, { useState } from "react";
import Login from "./Login.js";
import Register from "./Register.js";

function Auth({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      {isRegister ? (
        <Register onRegister={() => setIsRegister(false)} />
      ) : (
        <Login onLogin={onLogin} onSwitchToRegister={() => setIsRegister(true)} />
      )}
    </div>
  );
}

export default Auth;