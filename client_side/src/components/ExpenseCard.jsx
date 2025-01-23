import React from "react";
import { Link } from "react-router-dom";

const ExpenseCard = (props) => {
  const deleteFunc = async () => {
    try {
      if(window.confirm("Are you sure you want to delete this note?"))
      {
      const response = await fetch("http://localhost:8000/expensedelete", {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({id:props.id}),
        credentials:"include"
      });
      if(!response.ok)
      {
        const errorMsg=await response.text()
        alert(errorMsg)
      }
      else
      {
        const result=await response.text()
        alert(result)
      }
    }
    } catch (error) {
      alert(error.message)
    }
  };
  return (
    <div className="container">
      <div className="card" style={{ width: "20rem" }}>
        <div className="card-body">
          <h5 className="card-title">{props.expenseName}</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">
            {props.expenseCategory}
          </h6>
          <p className="card-text">Expense Amount={props.expenseAmount}</p>
          <p className="card-link">
            Date:<b>{props.date}</b>
          </p>
          <Link to="/aboutus">
            <button type="button" className="btn btn-warning">
              Edit
            </button>
          </Link>
          <button
            type="button"
            className="btn btn-danger mx-3"
            onClick={deleteFunc}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseCard;
