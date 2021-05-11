import React from "react";

export default function Login() {
  return (
    <div className="container login-container">
      <div className="card">
        <h3>
          <i className="fas fa-palette"></i>ColorMyYear
        </h3>
        <div className="section">
          <p className="lead">Track your mood with colors day to day</p>
        </div>
        <div className="section">
          <a href="/auth/google" className="btn red darken-1">
            <i className="fab fa-google"></i>
            Login with Google
          </a>
        </div>
      </div>
    </div>
  );
}