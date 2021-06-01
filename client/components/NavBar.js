import React from "react";

export default function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg custom-nav">
      <div className="container nav-container">
        <a className="navbar-brand me-2" href="https://mdbgo.com/">
          <i className="fas fa-swatchbook nav-icon"></i>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#navbar-links"
          aria-controls="navbar-links"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbar-links">
          <a className="btn btn-link px-3 me-2" type="button" href="/dashboard">
            <i className="far fa-calendar nav-icon"></i>
            Dashboard
          </a>
          <a className="btn btn-link px-3 me-2" type="button" href="/palette">
            <i className="fas fa-palette nav-icon"></i>
            Palette
          </a>
          <a href="/logout" type="button" className="btn btn-link px-3 me-2">
            <i className="fas fa-sign-out-alt nav-icon"></i>
            Logout
          </a>
        </div>
      </div>
    </nav>
  );
}
