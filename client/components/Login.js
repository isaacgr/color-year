import React from "react";

export default function Login() {
  return (
    <div className="container login-container">
      <div className="card">
        <h3 className="title">
          <i className="fas fa-palette icon"></i>ColorMyYear
        </h3>
        <div className="section">
          <p className="lead">Track your mood with colors day to day</p>
        </div>
        <div className="section">
          <a href="/auth/google" className="btn red darken-1">
            <i className="fab fa-google icon"></i>
            Login with Google
          </a>
        </div>
      </div>
    </div>
  );
}
