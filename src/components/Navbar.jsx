import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const handleSignout = () => {
      // eslint-disable-next-line no-restricted-globals
    if (confirm("Are you sure?")) {
      document.cookie =
        "loginToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      localStorage.clear()
      alert("You have been signed out");
      window.location.reload();
    }
  };
  const location = useLocation();
  const isLoggedIn = document.cookie.includes("loginToken=");
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Navbar
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  About Us
                </Link>
              </li>
              {!isLoggedIn && (
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/login" ? "active" : ""
                    }`}
                    to="/login"
                  >
                    Login
                  </Link>
                </li>
              )}
              {!isLoggedIn && (
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/register" ? "active" : ""
                    }`}
                    to="/register"
                  >
                    Register
                  </Link>
                </li>
              )}
              {isLoggedIn && (
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/dashboard" ? "active" : ""
                    }`}
                    to="/dashboard"
                  >
                    Dashboard
                  </Link>
                </li>
              )}
            </ul>
            {isLoggedIn && (
              <button
                type="button"
                onClick={handleSignout}
                className="btn btn-light"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
