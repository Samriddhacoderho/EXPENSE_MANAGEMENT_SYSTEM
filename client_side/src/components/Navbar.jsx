import React, { useContext} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { context } from "../contexts/Context";

const Navbar = () => {
  const contexts = useContext(context);
  const navigate=useNavigate()
  const handleSignout = () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Are you sure?")) {
      document.cookie =
        "loginToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      localStorage.clear();
      alert("You have been signed out");
      navigate("/")
      window.location.reload();
    }
  };
  const location = useLocation();
  const isLoggedIn = document.cookie.includes("loginToken=");
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg"
        style={
          contexts.mode === "Enable Dark Mode"
            ? { backgroundColor: "#e3f2fd" }
            : { backgroundColor: "#2B3035" }
        }
      >
        <div className="container-fluid">
          <Link
            className="navbar-brand"
            to="/"
            style={
              contexts.mode === "Enable Dark Mode"
                ? { color: "black" }
                : { color: "white" }
            }
          >
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
                  style={
                    contexts.mode === "Enable Dark Mode"
                      ? { color: "black" }
                      : { color: "white" }
                  }
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
                  style={
                    contexts.mode === "Enable Dark Mode"
                      ? { color: "black" }
                      : { color: "white" }
                  }
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
                    style={
                      contexts.mode === "Enable Dark Mode"
                        ? { color: "black" }
                        : { color: "white" }
                    }
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
                    style={
                      contexts.mode === "Enable Dark Mode"
                        ? { color: "black" }
                        : { color: "white" }
                    }
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
                    style={
                      contexts.mode === "Enable Dark Mode"
                        ? { color: "black" }
                        : { color: "white" }
                    }
                  >
                    Dashboard
                  </Link>
                </li>
              )}
              {isLoggedIn && (
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      location.pathname === "/create-expense" ? "active" : ""
                    }`}
                    to="/create-expense"
                    style={
                      contexts.mode === "Enable Dark Mode"
                        ? { color: "black" }
                        : { color: "white" }
                    }
                  >
                    Create Expense
                  </Link>
                </li>
              )}
            </ul>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                style={{ backgroundColor: "green" }}
                onClick={
                  contexts.mode === "Enable Dark Mode"
                    ? () => contexts.setmode("Disable Dark Mode")
                    : () => contexts.setmode("Enable Dark Mode")
                }
              />
              <label
                className="form-check-label"
                for="flexSwitchCheckDefault"
                style={contexts.mode==="Enable Dark Mode"?{color:"black"}:{color:"white"}}
                >
                {contexts.mode}
              </label>
            </div>
            {isLoggedIn && (
              <button
                type="button"
                onClick={handleSignout}
                className="btn btn-light mx-3"
                style={
                  contexts.mode === "Enable Dark Mode"
                    ? { backgroundColor: "black", color: "white" }
                    : { backgroundColor: "white" }
                }
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