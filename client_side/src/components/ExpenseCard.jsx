import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { context } from "../contexts/Context";
import "../css_files/Expense.css";

const ExpenseCard = (props) => {
  const contextsetItem = useContext(context);

  const func_setItems = () => {
    contextsetItem.setupdateItems({
      id: props.id,
      expenseName: props.expenseName,
      expenseAmount: props.expenseAmount,
      expenseCategory: props.expenseCategory,
    });
  };

  const deleteFunc = async () => {
    try {
      if (window.confirm("Are you sure you want to delete this note?")) {
        const response = await fetch("http://localhost:8000/expensedelete", {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ id: props.id }),
          credentials: "include",
        });
        if (!response.ok) {
          const errorMsg = await response.text();
          alert(errorMsg);
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
    <div className="expense-card-container">
      <div className="expense-card" style={contextsetItem.mode==="Enable Dark Mode"?{backgroundColor:"#f5f5f5"}:{backgroundColor:"#201c1c",color:"white"}}>
        <div className="expense-card-body">
          <h5 className="expense-card-title" style={contextsetItem.mode==="Enable Dark Mode"?{color:"#333"}:{color:"white"}}>{props.expenseName}</h5>
          <h6 className="expense-card-category">{props.expenseCategory}</h6>
          <p className="expense-card-amount">Expense Amount: {props.expenseAmount}</p>
          <p className="expense-card-date">
            Date: <b>{props.date}</b>
          </p>
          <div className="buttons-container">
            <Link to="/edit-expense">
              <button type="button" className="expense-card-btn-edit" onClick={func_setItems}>
                Edit
              </button>
            </Link>
            <button
              type="button"
              className="expense-card-btn-delete"
              onClick={deleteFunc}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseCard;
