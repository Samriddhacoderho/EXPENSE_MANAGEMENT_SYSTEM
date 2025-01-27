import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { context } from "../contexts/Context";
import styles from "./Login.module.css";

const Login = () => {
  const isLoggedin = document.cookie.includes("loginToken=");
  const contextAccess = useContext(context);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onsubmit = async (data) => {
    console.log(data);
    const response = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      alert(errorMessage);
    } else {
      const result = await response.json();
      alert(result.message);
      contextAccess.setUserMessage(result.firstname);
      navigate("/");
    }
  };

  return !isLoggedin ? (
    <div className={`${styles.container} d-flex align-items-center justify-content-center`}>
      <div className={`${styles.card} shadow`}>
        {/* Logo image */}
        <div className={`${styles.logo} mb-3`} />
      <h2 className="text-center mb-4">Expense Tracker</h2>
        <h3 className="text-center mb-4">Login</h3>
        <form onSubmit={handleSubmit(onsubmit)}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              id="email"
              placeholder="Enter your email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email.message}</div>
            )}
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              id="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "Minimum length is 8" },
              })}
            />
            {errors.password && (
              <div className="invalid-feedback">
                {errors.password.message}
              </div>
            )}
          </div>
          <div className="d-flex justify-content-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`btn ${styles.loginButton}`}
            >
              {isSubmitting ? "Submitting..." : "Login"}
            </button>
          </div>
        </form>
        <div className="text-center mt-3">
          <span>New user? </span>
          <Link to="/register" className="text-decoration-none">
            Register Now
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <div className="container text-center">
      <h5>You cannot access this page after logging in.</h5>
    </div>
  );
};

export default Login;
