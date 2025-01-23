import React from "react";

const ExpenseCard = (props) => {
  return (
    <div className="container">
      <div className="card" style={{width: "18rem"}}>
        <div className="card-body">
          <h5 className="card-title">{props.expenseName}</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">
            {props.expenseCategory}
          </h6>
          <p className="card-text">Expense Amount={props.expenseAmount}</p>
          <a href="/" className="card-link">
            {props.date}
          </a>
        </div>
      </div>
    </div>
  );
};

export default ExpenseCard;
