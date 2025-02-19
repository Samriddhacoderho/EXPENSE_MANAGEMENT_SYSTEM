import React, { useContext } from "react";
import { context } from "../contexts/Context";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "../css_files/Editexpense.css"

const Editexpense = () => {
    const contexts=useContext(context)
    const navigate = useNavigate();
    const isLoggedin = document.cookie.includes("loginToken=");
    const contextItemAccess = useContext(context);
    contexts.mode==="Enable Dark Mode"?document.body.style.backgroundColor="white":document.body.style.backgroundColor="black"
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm();

    const onclick = async (data) => {
        try {
            if (!data.expenseName && !data.expenseAmount && !data.expenseCategory) {
                alert("Nothing to Update");
            } else {
                if (window.confirm("Are you sure you want to update this expense?")) {
                    const response = await fetch(`http://localhost:8000/expenseupdate/${contextItemAccess.updateItems.id}`, {
                        method: "PUT",
                        headers: {
                            "Content-type": "application/json",
                        },
                        body: JSON.stringify(data),
                        credentials: "include",
                    });
                    if (!response.ok) {
                        const errorMsg = await response.text();
                        alert(errorMsg);
                    } else {
                        const result = await response.text();
                        alert(result);
                        navigate("/dashboard");
                    }
                }
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return isLoggedin ? (
        contextItemAccess.updateItems ? (
            <div className="edit-expense-container my-3" style={contexts.mode==="Enable Dark Mode"?{backgroundColor:"#fff"}:{backgroundColor:"#292929",border:"3px solid red"}}>
                <form onSubmit={handleSubmit(onclick)} className="edit-expense-form">
                    <div className="form-group">
                        <label htmlFor="expensename" className="form-label" style={contexts.mode==="Enable Dark Mode"?{color:"black"}:{color:"white"}}>
                            New Expense Name
                        </label>
                        <input
                            type="text"
                            className="expense-name-input"
                            id="expenseName"
                            defaultValue={contextItemAccess.updateItems.expenseName}
                            {...register("expenseName")}
                        />
                        {errors.expenseName && (
                            <p className="error-message">{errors.expenseName.message}</p>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="expenseamount" className="form-label" style={contexts.mode==="Enable Dark Mode"?{color:"black"}:{color:"white"}}>
                            New Expense Amount
                        </label>
                        <input
                            type="number"
                            className="expense-amount-input"
                            id="expenseAmount"
                            step="any"
                            defaultValue={contextItemAccess.updateItems.expenseAmount}
                            {...register("expenseAmount", {
                                min: { value: 1, message: "Invalid Amount" },
                            })}
                        />
                        {errors.expenseAmount && (
                            <p className="error-message">{errors.expenseAmount.message}</p>
                        )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="expensecategory" className="form-label" style={contexts.mode==="Enable Dark Mode"?{color:"black"}:{color:"white"}}>
                            New Expense Category
                        </label>
                        <select
                            id="expenseCategory"
                            {...register("expenseCategory")}
                            defaultValue={contextItemAccess.updateItems.expenseCategory}
                            className="expense-category-select"
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
                            <p className="error-message">{errors.expenseCategory.message}</p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary submit-button"
                        disabled={isSubmitting}
                        style={contexts.mode==="Enable Dark Mode"?{backgroundColor:"#007bff"}:{backgroundColor:"green"}}
                    >
                        {isSubmitting ? "Updating Expense" : "Update Expense"}
                    </button>
                </form>
            </div>
        ) : (
            <div className="access-denied">
                <h1>You cannot access this page by directly hitting the /edit-expense API.</h1>
                <h2>You can only access this page via Dashboard--'Edit' button</h2>
            </div>
        )
    ) : (
        <div className="access-denied">
            <h1>You cannot access this page without logging in. </h1>
        </div>
    );
};

export default Editexpense;
