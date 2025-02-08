import React, { useState } from "react";
import { useForm } from "react-hook-form";

const CreateExpense = () => {
  const isLoggedin=document.cookie.includes("loginToken=")
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors,isSubmitting },
  } = useForm();

  const onclick = async (data) => {
    try {
      if (window.confirm("Are you sure you want to create this expense?")) {
        const response = await fetch("http://localhost:8000/expense-create", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(data),
          credentials: "include",
        });
        if (!response.ok) {
          alert(await response.text());
        } else {
          const result = await response.text();
          alert(result);
        }
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    isLoggedin?<div className="container my-3" style={{ border: "1px solid black" }}>
      <form onSubmit={handleSubmit(onclick)}>
        <div className="mb-3">
          <label htmlFor="expensename" className="form-label">
            Expense Name
          </label>
          <input
            type="text"
            className="form-control"
            id="expenseName"
            placeholder="Enter your expense name here"
            {...register("expenseName", {
              required: "This field cannot be left empty",
            })}
          />
          {errors.expenseName && (
            <p style={{ color: "red" }}>{errors.expenseName.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="expenseamount" className="form-label">
            Expense Amount
          </label>
          <input
            type="number"
            className="form-control"
            id="expenseAmount"
            step="any"
            placeholder="Enter your expense amount here:"
            {...register("expenseAmount", {
              required: "This cannot be empty",
              min: { value: 1, message: "Invalid Amount" },
            })}
          />
          {errors.expenseAmount && (
            <p style={{ color: "red" }}>{errors.expenseAmount.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="expensecategory" className="form-label">
            Expense Category:
          </label>
          <select
            id="expenseCategory"
            {...register("expenseCategory", {
              required: "Please choose one category",
            })}
          >
            <option value="">Choose One Option</option>
            <option value="food">Food</option>
            <option value="utility">Utility</option>
            <option value="health">Health</option>
            <option value="education">Education</option>
            <option value="miscalleneous">Miscalleneous</option>
            <option value="other">Other</option>
          </select>
          {errors.expenseCategory && (
            <p style={{ color: "red" }}>{errors.expenseCategory.message}</p>
          )}
        </div>
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting?"Creating Expense":"Create Expense"}
        </button>
      </form>
    </div>:<div><h1>You cannot access this page without logging in</h1></div>
  );
};

export default CreateExpense;
