import React, { useContext } from 'react';
import { context } from '../contexts/Context';
import Button from './Button';
import styles from './Home.module.css'; // Importing the correct CSS module

const Home = () => {
  const firstnameAccess = useContext(context);
  const isLoggedIn = document.cookie.includes("loginToken=");

  return (
    isLoggedIn ? (
      <div>
        <h1>Welcome to Home Page {firstnameAccess.userMessage}</h1>
        <div>{/* Add other content here if needed */}</div>
      </div>
    ) : (
      <div className={styles.homeContainer}>
        <h1>Welcome to Home Page</h1>
        <div className={styles.buttonContainer}>
          <Button />
        </div>
      </div>
    )
  );
};

export default Home;
