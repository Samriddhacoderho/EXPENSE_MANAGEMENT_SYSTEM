import React, { useContext } from "react";
import { context } from "../contexts/Context";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Editexpense = () => {
    const navigate=useNavigate()
  const isLoggedin = document.cookie.includes("loginToken=");
  const contextItemAccess = useContext(context);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const onclick=async(data)=>{
    try {
        if(!data.expenseName && !data.expenseAmount && !data.expenseCategory)
        {
            alert("Nothing to Update")
        }
        else
        {
            if(window.confirm("Are you sure you want to update this expense?"))
            {
            const response=await fetch(`http://localhost:8000/expenseupdate/${contextItemAccess.updateItems.id}`,{
                method:"PUT",
                headers:{
                    "Content-type":"application/json"
                },
                body:JSON.stringify(data),
                credentials:"include",
            })
            if(!response.ok)
            {
                const errorMsg=await response.text();
                alert(errorMsg)
            }
            else
            {
                const result=await response.text();
                alert(result);
                navigate("/dashboard")
            }
        }
        }
    } catch (error) {
        alert(error.message)
    }
}

  return isLoggedin ? (
    contextItemAccess.updateItems ? (
      <div className="container my-3" style={{ border: "1px solid black" }}>
        <form onSubmit={handleSubmit(onclick)}>
          <div className="mb-3">
            <label htmlFor="expensename" className="form-label">
              New Expense Name
            </label>
            <input
              type="text"
              className="form-control"
              id="expenseName"
              defaultValue={contextItemAccess.updateItems.expenseName}
              {...register("expenseName", {
              })}
            />
            {errors.expenseName && (
              <p style={{ color: "red" }}>{errors.expenseName.message}</p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="expenseamount" className="form-label">
              New Expense Amount
            </label>
            <input
              type="number"
              className="form-control"
              id="expenseAmount"
              step="any"
              defaultValue={contextItemAccess.updateItems.expenseAmount}
              {...register("expenseAmount", {
                min: { value: 1, message: "Invalid Amount" },
              })}
            />
            {errors.expenseAmount && (
              <p style={{ color: "red" }}>{errors.expenseAmount.message}</p>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="expensecategory" className="form-label">
              New Expense Category:
            </label>
            <select
              id="expenseCategory"
              {...register("expenseCategory", {
              })}
              defaultValue={contextItemAccess.updateItems.expenseCategory}
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
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating Expense" : "Update Expense"}
          </button>
        </form>
      </div>
    ) : (
      <div>
        <h1>You cannot access this page.</h1>
      </div>
    )
  ) : (
    <div>
      <h1>You cannot access this page without logging in. </h1>
    </div>
  );
};

export default Editexpense;
