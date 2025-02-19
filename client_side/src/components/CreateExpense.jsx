import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import {useNavigate} from "react-router-dom"
import "../css_files/Createexpense.css"
import { context } from "../contexts/Context";

const CreateExpense = () => {
  const contexts=useContext(context)
  const navigate=useNavigate()
  const isLoggedin = document.cookie.includes("loginToken=")
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
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
          alert("Internal System Failure");
        } else {
          const result = await response.text();
          alert(result);
          navigate("/dashboard")
        }
      }
    } catch (error) {
      alert(error.message);
    }
  };

  contexts.mode==="Enable Dark Mode"?document.body.style.backgroundColor="white":document.body.style.backgroundColor="black"

  return (
    isLoggedin ? <div className="create-expense-container" style={contexts.mode==="Enable Dark Mode"?{backgroundColor:"#fff"}:{backgroundColor:"#292929",border:"3px solid red"}}>
      <form onSubmit={handleSubmit(onclick)} className="expense-form">
        <div className="form-group">
          <label htmlFor="expensename" className="form-label" style={contexts.mode==="Enable Dark Mode"?{color:"black"}:{color:"white"}}>Expense Name</label>
          <input
            type="text"
            className="form-control"
            id="expenseName"
            placeholder="Enter your expense name here"
            {...register("expenseName", {
              required: "This field cannot be left empty",
            })}
          />
          {errors.expenseName && <p className="error-message">{errors.expenseName.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="expenseamount" className="form-label" style={contexts.mode==="Enable Dark Mode"?{color:"black"}:{color:"white"}}>Expense Amount</label>
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
          {errors.expenseAmount && <p className="error-message">{errors.expenseAmount.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="expensecategory" className="form-label" style={contexts.mode==="Enable Dark Mode"?{color:"black"}:{color:"white"}}>Expense Category:</label>
          <select
            id="expenseCategory"
            className="form-select"
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
          {errors.expenseCategory && <p className="error-message">{errors.expenseCategory.message}</p>}
        </div>
        <button type="submit" className="submit-btn" disabled={isSubmitting} style={contexts.mode==="Enable Dark Mode"?{backgroundColor:"#007bff"}:{backgroundColor:"green"}}>
          {isSubmitting ? "Creating Expense" : "Create Expense"}
        </button>
      </form>
    </div> : <div className="login-error">
      <h1>You cannot access this page without logging in</h1>
    </div>
  );
};

export default CreateExpense;
