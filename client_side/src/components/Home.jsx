import React, { useContext } from 'react';
import { context } from '../contexts/Context';
import { Link } from "react-router-dom";
import "../css_files/Home.css";
// update dark mode
const Home = () => {
  const contexts=useContext(context) 
  const firstnameAccess = useContext(context);
  const isLoggedIn = document.cookie.includes("loginToken=");  

  return (
    isLoggedIn ? (
      <div className="home-container" style={contexts.mode==="Enable Dark Mode"?{backgroundColor:"#f5f5f5"}:{backgroundColor:"#161515"}}> 
        <h1 className="home-welcome-message" style={contexts.mode==="Enable Dark Mode"?{color:"#333"}:{color:"white"}}>
          Welcome to Home Page {firstnameAccess.userMessage}:) 
        </h1>
      </div>
    ) : (
      <div className="home-container" style={contexts.mode==="Enable Dark Mode"?{backgroundColor:"#f5f5f5"}:{backgroundColor:"#161515"}}>
        <h1 className="home-welcome-message" style={contexts.mode==="Enable Dark Mode"?{color:"#333"}:{color:"white"}}>Welcome to Budget Bee</h1>
        <p className="home-description" style={contexts.mode==="Enable Dark Mode"?{color:"rgb(103 93 73)"}:{color:"#e7dada"}}>A budgeting app for managing your finances</p>
        <div className="home-buttons"> 
          <Link to="/login">
            <button className="home-button login-button">Login</button>
          </Link>
          <Link to="/register">
            <button className="home-button register-button">Register</button>
          </Link>
        </div>
      </div> 
    )
  );
};

export default Home;