import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

function Navbar() {
  const { isLoggedIn, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          Your Logo
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/list">
                Home
              </NavLink>
            </li>
          </ul>
        </div>

        {isLoggedIn ? (
          <NavLink to="/login" onClick={logout} className="btn btn-danger">
            Log Out
          </NavLink>
        ) : (
          <NavLink to="/login" className="btn btn-primary">
            Sign In
          </NavLink>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
