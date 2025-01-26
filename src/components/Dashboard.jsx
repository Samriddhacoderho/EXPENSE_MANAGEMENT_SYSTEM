import React, { useState } from "react";
import ExpenseCard from "./ExpenseCard";

const Dashboard = () => {
  const [expense,setExpense]=useState([])
  const [buttontext,setbuttontext]=useState("Show Expenses")
  const handleExpense=async()=>{
    try {
      if(buttontext==='Show Expenses')
      {
        setbuttontext("Hide Expenses")
      }
      else
      {
        setbuttontext("Show Expenses")
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
        setExpense(result)
      }
    } catch (error) {
      alert(error.message);
    }
  }
  const isLoggedIn = document.cookie.includes("loginToken=");
  return isLoggedIn ? (
    <>
      <button className="mx-3 my-3" onClick={handleExpense}>{buttontext}</button>
      {buttontext==="Hide Expenses" && expense.map((resItem)=>{
        return <ExpenseCard key={resItem.date}expenseName={resItem.expenseName} expenseCategory={resItem.expenseCategory} expenseAmount={resItem.expenseAmount} date={resItem.date}/>
      })}
    </>
  ) : (
    <div className="container my-2 mx-3"><h1>You cannot access this page without logging in</h1></div>
  );
};

export default Dashboard;
