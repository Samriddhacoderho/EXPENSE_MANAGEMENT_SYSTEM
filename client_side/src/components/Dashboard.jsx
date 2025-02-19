import React, { useContext, useState } from "react";
import ExpenseCard from "./ExpenseCard";
import "../css_files/Dashboard.css";
import { context } from "../contexts/Context";

const Dashboard = () => {
  const [expense, setExpense] = useState([]);
  const [buttontext, setbuttontext] = useState("Show Expenses");
  const contexts=useContext(context)
  contexts.mode==="Enable Dark Mode"?document.body.style.backgroundColor="white":document.body.style.backgroundColor="black"

  const handleExpense = async () => {
    try {
      if (buttontext === "Show Expenses") {
        setbuttontext("Hide Expenses");
      } else {
        setbuttontext("Show Expenses");
      }

      const response = await fetch("http://localhost:8000/expenseget", {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        const errorMsg = await response.text();
        alert(errorMsg);
      } else {
        const result = await response.json();
        if (result.length > 0) {
          setExpense(result);
        } else {
          setExpense("no data");
        }
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const isLoggedIn = document.cookie.includes("loginToken=");
  return isLoggedIn ? (
    <>
      <button className="dashboard-button mx-3 my-3" onClick={handleExpense} style={contexts.mode==="Enable Dark Mode"?{backgroundColor:"#007bff"}:{backgroundColor:"#ec1c1c"}}>
        {buttontext}
      </button>
      {!expense.includes("no data")
        ? buttontext === "Hide Expenses" && (
            <div className="expenses-container">
              <div className="expenses-row">
                {expense.map((resItem) => {
                  return (
                    <div className="expenses-column my-4" key={resItem._id}>
                      <ExpenseCard
                        expenseName={resItem.expenseName}
                        expenseCategory={resItem.expenseCategory}
                        expenseAmount={resItem.expenseAmount}
                        date={resItem.date}
                        id={resItem._id}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )
        : buttontext === "Hide Expenses" && (
            <div className="no-expenses-message mx-3">
              <h1>No expenses found</h1>
            </div>
          )}
    </>
  ) : 
  (
    <div className="home-container">
      <h1 className="home-welcome-message" style={{color:"red"}}>You cannot access this page without logging in</h1>
    </div>
  );
};

export default Dashboard;
