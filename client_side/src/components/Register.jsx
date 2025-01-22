import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { context } from "../contexts/Context";
import styles from "./Register.module.css";

const Register = () => {
  const isLoggedin = document.cookie.includes("loginToken=");
  const contextAccess = useContext(context);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const onclick = async (data) => {
    const response = await fetch("http://localhost:8000/register", {
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
    <div
      className={`${styles.container} d-flex align-items-center justify-content-center`}
    >
      <div className={`${styles.card} shadow`}>
        {/* Logo */}
        <div className={`${styles.logo} mb-3`} />
        <h2 className="text-center mb-4">Expense Tracker</h2>
        <h3 className="text-center mb-4">Register</h3>
        <form onSubmit={handleSubmit(onclick)}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="firstname" className="form-label">
                First Name:
              </label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                className={`form-control ${
                  errors.firstname ? "is-invalid" : ""
                }`}
                {...register("firstname", {
                  required: "Firstname must not be left empty",
                })}
              />
              {errors.firstname && (
                <div className="invalid-feedback">{errors.firstname.message}</div>
              )}
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="lastname" className="form-label">
                Last Name:
              </label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                className={`form-control ${
                  errors.lastname ? "is-invalid" : ""
                }`}
                {...register("lastname", {
                  required: "Last name must not be left empty",
                })}
              />
              {errors.lastname && (
                <div className="invalid-feedback">{errors.lastname.message}</div>
              )}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email.message}</div>
            )}
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="password" className="form-label">
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 8, message: "Minimum Length is 8" },
                })}
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password.message}</div>
              )}
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="confirmpassword" className="form-label">
                Confirm Password:
              </label>
              <input
                type="password"
                id="confirmpassword"
                name="confirmpassword"
                className={`form-control ${
                  errors.confirmPass ? "is-invalid" : ""
                }`}
                {...register("confirmPass", {
                  required: "Confirm Password is required",
                  minLength: { value: 8, message: "Minimum Length is 8" },
                  validate: (value) =>
                    value === watch("password") ||
                    "Passwords do not match each other",
                })}
              />
              {errors.confirmPass && (
                <div className="invalid-feedback">
                  {errors.confirmPass.message}
                </div>
              )}
            </div>
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="agreements"
              {...register("agreements", { required: "This must be checked" })}
            />
            <label className="form-check-label" htmlFor="agreements">
              I agree to the terms and conditions
            </label>
            {errors.agreements && (
              <div className="text-danger">{errors.agreements.message}</div>
            )}
          </div>
          <div className="text-center">
            <button
              type="submit"
              className={`btn ${styles.registerButton}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </div>
        </form>
        <div className="text-center mt-3">
          Already have an account?{" "}
          <Link to="/login" className="text-decoration-none">
            Login Now
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

export default Register;
