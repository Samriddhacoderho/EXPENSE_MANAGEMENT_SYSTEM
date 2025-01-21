import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { context } from "../contexts/Context";

const Register = () => {
  const isLoggedin=document.cookie.includes("loginToken=")
  const contextAccess=useContext(context);
  const navigate=useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    formState:{errors,isSubmitting}
  } = useForm();

  const onclick = async (data) => {
    const response=await fetch("http://localhost:8000/register",{
      method:"POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify(data),
      credentials:"include"
    })
    if(!response.ok)
    {
      const errorMessage=await response.text();
      alert(errorMessage)
    }
    else
    {
      const result=await response.json()
      alert(result.message)
      contextAccess.setUserMessage(result.firstname)
      navigate("/")
    }
  };
  return (
    !isLoggedin?<div className="container my-5" style={{ border: "2px solid black" }}>
      <form className="my-5 mx-5" onSubmit={handleSubmit(onclick)}>
        <div className="mb-3">
          <label htmlFor="firstname" className="form-label">
            First Name:
          </label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            className="form-control"
            {...register("firstname", {
              required: "Firstname must not be left empty",
            })}
          />
          {errors.firstname && (
            <p className="errors" style={{ color: "red" }}>
              {errors.firstname.message}
            </p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="lastname" className="form-label">
            Last Name:
          </label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            className="form-control"
            {...register("lastname", {
              required: "Last name must not be left empty",
            })}
          />
          {errors.lastname && <p className="errors" style={{ color: "red" }}>
              {errors.lastname.message}
            </p>}
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <p className="errors" style={{ color: "red" }}>
              {errors.email.message}
            </p>}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 8, message: "Minimum Length is 8" },
            })}
          />
          {errors.password && <p className="errors" style={{ color: "red" }}>
              {errors.password.message}
            </p>}
        </div>

        <div className="mb-3">
          <label htmlFor="confirmpassword" className="form-label">
            Confirm Password:
          </label>
          <input
            type="password"
            id="confirmpassword"
            name="confirmpassword"
            className="form-control"
            {...register("confirmPass", {
              required: "Confirm Password is required",
              minLength: { value: 8, message: "Minimum Length is 8" },
              validate: (value) =>
                value === watch("password") ||
                "Passwords do not match each other",
            })}
          />
          {errors.confirmPass && <p className="errors" style={{ color: "red" }}>
              {errors.confirmPass.message}
            </p>}
        </div>

        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
            {...register("agreements", { required: "This must be checked" })}
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            I agree to the terms and conditions
          </label>
          {errors.agreements && (
            <p className="errors" style={{ color: "red" }}>
              {errors.agreements.message}
            </p>
          )}
        </div>

        <div className="mb-3">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting?"Registering":"Register"}
          </button>
        </div>
      </form>
      <div className="mx-2 my-2">
        Already Have an Account?<Link className="mx-2 link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" to="/login">Login Now</Link>
      </div>
    </div>:<>You cannot access this page after logging in</>
  );
};

export default Register;
