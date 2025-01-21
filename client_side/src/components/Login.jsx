import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { context } from "../contexts/Context";

const Login = () => {  
  const isLoggedin=document.cookie.includes("loginToken=")
  const contextAccess=useContext(context)
  const navigate=useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const onsubmit = async (data) => {
    console.log(data)
    const response=await fetch("http://localhost:8000/login",{
      method:'POST',
      headers: {
        "Content-Type": "application/json", // Important header
      },
      body:JSON.stringify(data),
      credentials:"include"
    })
    if(!response.ok)
    {
      const errorMessage=await response.text()
      alert(errorMessage)
    }
    else
    {
    const result=await response.json();
    alert(result.message)
    contextAccess.setUserMessage(result.firstname)
    navigate("/")
  }
  };
  return (
    !isLoggedin?<div className="container my-5" style={{ border: "2px solid black" }}>
      <form className="my-5 mx-5" onSubmit={handleSubmit(onsubmit)}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter your email here"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="errors" style={{ color: "red" }}>
              {errors.email.message}
            </p>
          )}
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Enter your password here"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 8, message: "Minimum Length is 8" },
            })}
          />
          {errors.password && (
            <p className="errors" style={{ color: "red" }}>
              {errors.password.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary"
        >
          {isSubmitting ? "Submitting" : "Submit"}
        </button>
      </form>
      <div className="mx-2 my-2">
        New User?<Link className="mx-2 link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"to="/register">Register Now</Link>
      </div>
    </div>:<>You cannot access this page after logging in</>
  );
};

export default Login
